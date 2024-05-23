const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
// const geojsonValidation = require('geojson-validation');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());

app.use(bodyParser.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// User registration (for simplicity, using a local JSON file)
app.post('/register', (req, res) => {
    try {
        const { username, password } = req.body;
        const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        if (users[username]) {
            return res.status(400).json({ message: 'User already exists' });
        }
        users[username] = { password };
        fs.writeFileSync('users.json', JSON.stringify(users));
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User login
app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        if (!users[username] || users[username].password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// File upload
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.json({ filename: file.filename, originalname: file.originalname });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Retrieve uploaded files
app.get('/files', (req, res) => {
    try {
        fs.readdir('uploads', (err, files) => {
            if (err) {
                return res.status(500).json({ message: 'Unable to retrieve files' });
            }
            res.json(files);
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Define a route to proxy Mapbox API requests
app.get('/mapbox/:style', async (req, res) => {
    try {
      const response = await axios.get(`https://api.mapbox.com/styles/v1/mapbox/${req.params.style}?sdk=js-3.3.0&access_token=YOUR_MAPBOX_ACCESS_TOKEN`);
      res.send(response.data);
    } catch (error) {
      console.error('Error fetching Mapbox style:', error);
      res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});