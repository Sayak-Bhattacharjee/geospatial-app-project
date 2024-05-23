(function(){"use strict";var e={2119:function(e,t,a){var o=a(5130),n=a(6768);const r={id:"app"};function s(e,t,a,o,s,i){const l=(0,n.g2)("router-link"),d=(0,n.g2)("router-view");return(0,n.uX)(),(0,n.CE)("div",r,[(0,n.Lk)("nav",null,[(0,n.bF)(l,{to:"/register"},{default:(0,n.k6)((()=>[(0,n.eW)("Register")])),_:1}),(0,n.bF)(l,{to:"/login"},{default:(0,n.k6)((()=>[(0,n.eW)("Login")])),_:1}),s.isLoggedIn?((0,n.uX)(),(0,n.Wv)(l,{key:0,to:"/map"},{default:(0,n.k6)((()=>[(0,n.eW)("Map")])),_:1})):(0,n.Q3)("",!0),s.isLoggedIn?((0,n.uX)(),(0,n.CE)("button",{key:1,onClick:t[0]||(t[0]=(...e)=>i.logout&&i.logout(...e))},"Logout")):(0,n.Q3)("",!0)]),(0,n.bF)(d)])}a(4114);var i={data(){return{isLoggedIn:!1}},created(){this.checkLoginStatus()},methods:{checkLoginStatus(){this.isLoggedIn=!!localStorage.getItem("userToken")},logout(){localStorage.removeItem("userToken"),this.isLoggedIn=!1,this.$router.push("/login")}},watch:{$route(){this.checkLoginStatus()}}},l=a(1241);const d=(0,l.A)(i,[["render",s]]);var u=d,c=a(1387),g=a(4232);const h=(0,n.Lk)("h2",null,"Register",-1),p=(0,n.Lk)("label",{for:"username"},"Username:",-1),m=(0,n.Lk)("label",{for:"password"},"Password:",-1),f=(0,n.Lk)("button",{type:"submit"},"Register",-1),v={key:0};function k(e,t,a,r,s,i){return(0,n.uX)(),(0,n.CE)("div",null,[h,(0,n.Lk)("form",{onSubmit:t[2]||(t[2]=(0,o.D$)(((...e)=>i.register&&i.register(...e)),["prevent"]))},[(0,n.Lk)("div",null,[p,(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>s.username=e),required:""},null,512),[[o.Jo,s.username]])]),(0,n.Lk)("div",null,[m,(0,n.bo)((0,n.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>s.password=e),required:""},null,512),[[o.Jo,s.password]])]),f],32),s.message?((0,n.uX)(),(0,n.CE)("p",v,(0,g.v_)(s.message),1)):(0,n.Q3)("",!0)])}var y=a(8355),w={data(){return{username:"",password:"",message:""}},methods:{async register(){try{const e=await y.A.post("http://localhost:3000/register",{username:this.username,password:this.password});e&&e.data&&e.data.message?alert(e.data.message):alert("Registration failed. Server response not as expected."),this.$router.push("/login")}catch(e){this.message=e.response.data.message,alert("Registration failed.")}}}};const L=(0,l.A)(w,[["render",k]]);var b=L;const C=(0,n.Lk)("h2",null,"Login",-1),M=(0,n.Lk)("label",{for:"username"},"Username:",-1),F=(0,n.Lk)("label",{for:"password"},"Password:",-1),S=(0,n.Lk)("button",{type:"submit"},"Login",-1),E={key:0};function O(e,t,a,r,s,i){return(0,n.uX)(),(0,n.CE)("div",null,[C,(0,n.Lk)("form",{onSubmit:t[2]||(t[2]=(0,o.D$)(((...e)=>i.login&&i.login(...e)),["prevent"]))},[(0,n.Lk)("div",null,[M,(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>s.username=e),required:""},null,512),[[o.Jo,s.username]])]),(0,n.Lk)("div",null,[F,(0,n.bo)((0,n.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>s.password=e),required:""},null,512),[[o.Jo,s.password]])]),S],32),s.message?((0,n.uX)(),(0,n.CE)("p",E,(0,g.v_)(s.message),1)):(0,n.Q3)("",!0)])}var T={data(){return{username:"",password:"",message:""}},methods:{async login(){try{const e=await y.A.post("http://localhost:3000/login",{username:this.username,password:this.password});this.message=e.data.message,"Login successful"===e.data.message&&(localStorage.setItem("userToken","your-auth-token"),localStorage.setItem("isLoggedIn",!0),this.$router.push("/map"))}catch(e){this.message=e.response.data.message||"Login failed"}}}};const A=(0,l.A)(T,[["render",O]]);var I=A;const _=(0,n.Lk)("h2",null,"Map",-1),D={ref:"mapContainer",class:"map-container"},R=["onMouseover"],$={key:1,class:"hover-card"};function j(e,t,a,o,r,s){return(0,n.uX)(),(0,n.CE)("div",null,[_,(0,n.Lk)("div",D,null,512),(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>s.toggleDraw&&s.toggleDraw(...e))},"Draw"),(0,n.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>s.measureDistance&&s.measureDistance(...e))},"Measure Distance"),(0,n.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>s.addMarker&&s.addMarker(...e))},"Add Marker"),r.hoverCard?((0,n.uX)(),(0,n.CE)("div",{key:0,class:"hover-card",style:(0,g.Tr)(r.hoverCardStyle)},[(0,n.Lk)("p",null,(0,g.v_)(r.hoverCard),1)],4)):(0,n.Q3)("",!0),(0,n.Lk)("input",{type:"file",onChange:t[3]||(t[3]=(...e)=>s.uploadFile&&s.uploadFile(...e))},null,32),(0,n.Lk)("button",{onClick:t[4]||(t[4]=(...e)=>s.loadFiles&&s.loadFiles(...e))},"Load Files"),((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(r.files,(e=>((0,n.uX)(),(0,n.CE)("div",{key:e,onMouseover:t=>s.showHoverCard(e)},(0,g.v_)(e),41,R)))),128)),r.hoverCard?((0,n.uX)(),(0,n.CE)("div",$,[(0,n.Lk)("p",null,(0,g.v_)(r.hoverCard),1)])):(0,n.Q3)("",!0)])}var x=a(2693),X=a.n(x),P=a(9467),q=a.n(P),W=a(5322),N={data(){return{map:null,draw:null,distanceMeasure:!1,markers:[],files:[],hoverCard:"",hoverCardStyle:{position:"absolute",top:"0",left:"0"}}},mounted(){X().accessToken="YOUR_MAPBOX_ACCESS_TOKEN",this.map=new(X().Map)({container:this.$refs.mapContainer,style:"mapbox://styles/mapbox/streets-v11",center:[0,0],zoom:2}),this.draw=new(q()),this.map.addControl(this.draw),this.map.on("load",(()=>{this.map.addControl(new(X().NavigationControl)),this.map.addControl(new(X().FullscreenControl))})),this.map.on("draw.create",this.updateDistance),this.map.on("draw.update",this.updateDistance),this.map.on("draw.delete",this.updateDistance),this.map.on("mousemove",(e=>{const t=this.map.queryRenderedFeatures(e.point);if(t.length){const a=t[0];this.hoverCard=`Type: ${a.geometry.type}`,this.hoverCardStyle.top=`${e.point.y}px`,this.hoverCardStyle.left=`${e.point.x}px`}else this.hoverCard=""}))},methods:{toggleDraw(){const e=this.draw.getMode();"draw_polygon"===e?this.draw.changeMode("simple_select"):this.draw.changeMode("draw_polygon")},measureDistance(){this.distanceMeasure=!this.distanceMeasure,this.distanceMeasure?this.draw.changeMode("draw_line_string"):this.draw.changeMode("simple_select")},updateDistance(){if(!this.distanceMeasure)return;const e=this.draw.getAll(),t=e.features[0];if(t&&"LineString"===t.geometry.type){const e=t.geometry.coordinates;let a=0;for(let t=0;t<e.length-1;t++){const[o,n]=e[t],[r,s]=e[t+1];a+=this.calculateDistance(n,o,s,r)}console.log(`Distance: ${a.toFixed(2)} km`)}},async uploadFile(e){const t=e.target.files[0],a=new FormData;a.append("file",t);try{await y.A.post("http://localhost:3000/upload",a,{headers:{"Content-Type":"multipart/form-data"}}),this.loadFiles()}catch(o){console.error("Error uploading file:",o),alert("Failed to upload file.")}},calculateDistance(e,t,a,o){const n=6371,r=this.degToRad(a-e),s=this.degToRad(o-t),i=Math.sin(r/2)*Math.sin(r/2)+Math.cos(this.degToRad(e))*Math.cos(this.degToRad(a))*Math.sin(s/2)*Math.sin(s/2),l=2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i));return n*l},degToRad(e){return e*(Math.PI/180)},addMarker(){this.map.on("click",(e=>{const t=new(X().Marker)({draggable:!0}).setLngLat(e.lngLat).addTo(this.map);t.on("dragend",(()=>{const e=t.getLngLat();console.log(`Marker moved to: ${e.lng}, ${e.lat}`)})),this.markers.push(t),this.map.off("click")}))},async loadFiles(){try{const e=await y.A.get("http://localhost:3000/files");this.files=e.data,this.files.forEach((e=>{e.endsWith(".geojson")?this.loadGeoJSON(e):e.endsWith(".tiff")&&this.loadTIFF(e)}))}catch(e){console.error("Error loading files:",e),alert("Failed to load files.")}},loadGeoJSON(e){y.A.get(`http://localhost:3000/uploads/${e}`).then((t=>{this.map.addSource(e,{type:"geojson",data:t.data}),this.map.addLayer({id:e,type:"line",source:e,paint:{"line-color":"#888","line-width":2}})})).catch((e=>{console.error("Error loading GeoJSON:",e),alert("Failed to load GeoJSON file.")}))},async loadTIFF(e){try{const t=await y.A.get(`http://localhost:3000/uploads/${e}`,{responseType:"arraybuffer"}),a=await W.Ay.fromArrayBuffer(t.data),o=await a.getImage(),n=await o.readRasters(),r=document.createElement("canvas");r.width=o.getWidth(),r.height=o.getHeight();const s=r.getContext("2d"),i=s.createImageData(r.width,r.height);for(let e=0;e<n[0].length;e++)i.data[4*e]=n[0][e],i.data[4*e+1]=n[0][e],i.data[4*e+2]=n[0][e],i.data[4*e+3]=255;s.putImageData(i,0,0);const l=r.toDataURL();this.map.addSource(e,{type:"image",url:l,coordinates:[[o.getOrigin()[0],o.getOrigin()[1]],[o.getOrigin()[0]+o.getResolution()[0]*o.getWidth(),o.getOrigin()[1]],[o.getOrigin()[0]+o.getResolution()[0]*o.getWidth(),o.getOrigin()[1]+o.getResolution()[1]*o.getHeight()],[o.getOrigin()[0],o.getOrigin()[1]+o.getResolution()[1]*o.getHeight()]]}),this.map.addLayer({id:e,source:e,type:"raster"})}catch(t){console.error("Error loading TIFF:",t),alert("Failed to load TIFF file.")}},showHoverCard(e){this.hoverCard=`File: ${e}`}}};const J=(0,l.A)(N,[["render",j]]);var U=J;const H=e=>((0,n.Qi)("data-v-5365194c"),e=e(),(0,n.jt)(),e),Q=H((()=>(0,n.Lk)("h1",null,"Welcome to Your Application",-1))),G=H((()=>(0,n.Lk)("p",null,"Choose an option from the navigation menu.",-1))),V=[Q,G];function B(e,t,a,o,r,s){return(0,n.uX)(),(0,n.CE)("div",null,V)}var K={name:"Home_Page"};const Y=(0,l.A)(K,[["render",B],["__scopeId","data-v-5365194c"]]);var z=Y;const Z=[{path:"/",name:"Home",component:z},{path:"/register",name:"Register",component:b},{path:"/login",name:"Login",component:I},{path:"/map",name:"Map",component:U,meta:{requiresAuth:!0}}],ee=(0,c.aE)({history:(0,c.LA)(),routes:Z});ee.beforeEach(((e,t,a)=>{const o=localStorage.getItem("isLoggedIn");e.matched.some((e=>e.meta.requiresAuth))&&!o?a({name:"Login"}):a()}));var te=ee;const ae=(0,o.Ef)(u);localStorage.getItem("user")||localStorage.setItem("isLoggedIn",!1),ae.use(te),ae.mount("#app")}},t={};function a(o){var n=t[o];if(void 0!==n)return n.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,a),r.exports}a.m=e,function(){var e=[];a.O=function(t,o,n,r){if(!o){var s=1/0;for(u=0;u<e.length;u++){o=e[u][0],n=e[u][1],r=e[u][2];for(var i=!0,l=0;l<o.length;l++)(!1&r||s>=r)&&Object.keys(a.O).every((function(e){return a.O[e](o[l])}))?o.splice(l--,1):(i=!1,r<s&&(s=r));if(i){e.splice(u--,1);var d=n();void 0!==d&&(t=d)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[o,n,r]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,o){return a.f[o](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{167:"b97be78a",223:"6fbaa069",234:"0446750d",243:"706d89ea",441:"c7b380f9",632:"12582a1a",855:"a209e9a4",967:"a045957f"}[e]+".js"}}(),function(){a.miniCssF=function(e){}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="frontend:";a.l=function(o,n,r,s){if(e[o])e[o].push(n);else{var i,l;if(void 0!==r)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var c=d[u];if(c.getAttribute("src")==o||c.getAttribute("data-webpack")==t+r){i=c;break}}i||(l=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",t+r),i.src=o),e[o]=[n];var g=function(t,a){i.onerror=i.onload=null,clearTimeout(h);var n=e[o];if(delete e[o],i.parentNode&&i.parentNode.removeChild(i),n&&n.forEach((function(e){return e(a)})),t)return t(a)},h=setTimeout(g.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=g.bind(null,i.onerror),i.onload=g.bind(null,i.onload),l&&document.head.appendChild(i)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){var e={524:0};a.f.j=function(t,o){var n=a.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var r=new Promise((function(a,o){n=e[t]=[a,o]}));o.push(n[2]=r);var s=a.p+a.u(t),i=new Error,l=function(o){if(a.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var r=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;i.message="Loading chunk "+t+" failed.\n("+r+": "+s+")",i.name="ChunkLoadError",i.type=r,i.request=s,n[1](i)}};a.l(s,l,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,o){var n,r,s=o[0],i=o[1],l=o[2],d=0;if(s.some((function(t){return 0!==e[t]}))){for(n in i)a.o(i,n)&&(a.m[n]=i[n]);if(l)var u=l(a)}for(t&&t(o);d<s.length;d++)r=s[d],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(u)},o=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=a.O(void 0,[504],(function(){return a(2119)}));o=a.O(o)})();
//# sourceMappingURL=app.c02a5f2c.js.map