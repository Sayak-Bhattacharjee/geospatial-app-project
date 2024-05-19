<template>
    <div>
        <h2>Map</h2>
        <div ref="mapContainer" class="map-container"></div>
        <button @click="toggleDraw">Draw</button>
        <button @click="measureDistance">Measure Distance</button>
        <button @click="addMarker">Add Marker</button>
         <div v-if="hoverCard" class="hover-card" :style="hoverCardStyle">
            <p>{{ hoverCard }}</p>
        </div>
        <input type="file" @change="uploadFile" />
        <button @click="loadFiles">Load Files</button>
        <div v-for="file in files" :key="file" @mouseover="showHoverCard(file)">
            {{ file }}
        </div>
        <div v-if="hoverCard" class="hover-card">
            <p>{{ hoverCard }}</p>
        </div>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import GeoTIFF from 'geotiff';

export default {
    data() {
        return {
            map: null,
            draw: null,
            distanceMeasure: false,
            markers: [],
            files: [],
            hoverCard: '',
            hoverCardStyle: {
                position: 'absolute',
                top: '0',
                left: '0'
            }
        };
    },
    mounted() {
        mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
        this.map = new mapboxgl.Map({
            container: this.$refs.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [0, 0],
            zoom: 2
        });

        this.draw = new MapboxDraw();
        this.map.addControl(this.draw);

        this.map.on('load', () => {
            this.map.addControl(new mapboxgl.NavigationControl());
            this.map.addControl(new mapboxgl.FullscreenControl());
        });

        this.map.on('draw.create', this.updateDistance);
        this.map.on('draw.update', this.updateDistance);
        this.map.on('draw.delete', this.updateDistance);

        this.map.on('mousemove', (e) => {
            const features = this.map.queryRenderedFeatures(e.point);
            if (features.length) {
                const feature = features[0];
                this.hoverCard = `Type: ${feature.geometry.type}`;
                this.hoverCardStyle.top = `${e.point.y}px`;
                this.hoverCardStyle.left = `${e.point.x}px`;
            } else {
                this.hoverCard = '';
            }
        });
    },
    methods: {
        toggleDraw() {
            const drawStatus = this.draw.getMode();
            if (drawStatus === 'draw_polygon') {
                this.draw.changeMode('simple_select');
            } else {
                this.draw.changeMode('draw_polygon');
            }
        },
        measureDistance() {
            this.distanceMeasure = !this.distanceMeasure;
            if (this.distanceMeasure) {
                this.draw.changeMode('draw_line_string');
            } else {
                this.draw.changeMode('simple_select');
            }
        },
        updateDistance() {
            if (!this.distanceMeasure) return;

            const data = this.draw.getAll();
            const line = data.features[0];
            if (line && line.geometry.type === 'LineString') {
                const coordinates = line.geometry.coordinates;
                let distance = 0;
                for (let i = 0; i < coordinates.length - 1; i++) {
                    const [lng1, lat1] = coordinates[i];
                    const [lng2, lat2] = coordinates[i + 1];
                    distance += this.calculateDistance(lat1, lng1, lat2, lng2);
                }
                console.log(`Distance: ${distance.toFixed(2)} km`);
            }
        },
        async uploadFile(event) {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            try {
                await axios.post('http://localhost:3000/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                this.loadFiles();
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Failed to upload file.');
            }
        },
        calculateDistance(lat1, lng1, lat2, lng2) {
            const R = 6371; // Earth radius in kilometers
            const dLat = this.degToRad(lat2 - lat1);
            const dLng = this.degToRad(lng2 - lng1);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(this.degToRad(lat1)) * Math.cos(this.degToRad(lat2)) *
                      Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        },
        degToRad(deg) {
            return deg * (Math.PI / 180);
        },
        addMarker() {
            this.map.on('click', (e) => {
                const marker = new mapboxgl.Marker({ draggable: true })
                    .setLngLat(e.lngLat)
                    .addTo(this.map);

                marker.on('dragend', () => {
                    const lngLat = marker.getLngLat();
                    console.log(`Marker moved to: ${lngLat.lng}, ${lngLat.lat}`);
                });

                this.markers.push(marker);
                this.map.off('click');
            });
        },
        async loadFiles() {
            try {
                const response = await axios.get('http://localhost:3000/files');
                this.files = response.data;
                this.files.forEach(file => {
                    if (file.endsWith('.geojson')) {
                        this.loadGeoJSON(file);
                    } else if (file.endsWith('.tiff')) {
                        this.loadTIFF(file);
                    }
                });
            } catch (error) {
                console.error('Error loading files:', error);
                alert('Failed to load files.');
            }
        },
        loadGeoJSON(file) {
            axios.get(`http://localhost:3000/uploads/${file}`)
                .then(response => {
                    this.map.addSource(file, {
                        type: 'geojson',
                        data: response.data
                    });
                    this.map.addLayer({
                        id: file,
                        type: 'line',
                        source: file,
                        paint: { 'line-color': '#888', 'line-width': 2 }
                    });
                })
                .catch(error => {
                console.error('Error loading GeoJSON:', error);
                alert('Failed to load GeoJSON file.');
            });
        },
        async loadTIFF(file) {
            try {
                const response = await axios.get(`http://localhost:3000/uploads/${file}`, { responseType: 'arraybuffer' });
                const tiff = await GeoTIFF.fromArrayBuffer(response.data);
                const image = await tiff.getImage();
                const rasters = await image.readRasters();
                const canvas = document.createElement('canvas');
                canvas.width = image.getWidth();
                canvas.height = image.getHeight();
                const ctx = canvas.getContext('2d');
                const imageData = ctx.createImageData(canvas.width, canvas.height);
                
                // Assuming the TIFF has a single band (grayscale image)
                for (let i = 0; i < rasters[0].length; i++) {
                    imageData.data[i * 4] = rasters[0][i];      // R value
                    imageData.data[i * 4 + 1] = rasters[0][i];  // G value
                    imageData.data[i * 4 + 2] = rasters[0][i];  // B value
                    imageData.data[i * 4 + 3] = 255;            // A value (opacity)
                }
                ctx.putImageData(imageData, 0, 0);

                const url = canvas.toDataURL();
                this.map.addSource(file, {
                    type: 'image',
                    url: url,
                    coordinates: [
                        [image.getOrigin()[0], image.getOrigin()[1]],
                        [image.getOrigin()[0] + image.getResolution()[0] * image.getWidth(), image.getOrigin()[1]],
                        [image.getOrigin()[0] + image.getResolution()[0] * image.getWidth(), image.getOrigin()[1] + image.getResolution()[1] * image.getHeight()],
                        [image.getOrigin()[0], image.getOrigin()[1] + image.getResolution()[1] * image.getHeight()]
                    ]
                });

                this.map.addLayer({
                    id: file,
                    source: file,
                    type: 'raster'
                });
            } catch (error) {
                console.error('Error loading TIFF:', error);
                alert('Failed to load TIFF file.');
            }
        },
        showHoverCard(file) {
            this.hoverCard = `File: ${file}`;
        }
    }
};
</script>

<style>
.map-container {
    width: 100%;
    height: 400px;
}

@media (max-width: 768px) {
    .map-container {
        height: 300px;
    }
}

.hover-card {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 200px;
}
</style>