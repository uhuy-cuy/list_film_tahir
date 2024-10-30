const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware untuk melayani file statis
app.use(express.static('public'));

let API_KEY = '849f1cf4910535caede216f647809e0d';
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Endpoint untuk mengambil daftar film
app.get('/api/movies', async (req, res) => {
    const query = req.query.query; // Ambil query pencarian dari parameter URL
    try {
        let response;
        if (query) {
            // Jika ada query, lakukan pencarian film
            response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`);
        } else {
            // Jika tidak ada query, ambil film populer
            response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        }
        res.json(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data film.');
    }
});

// Endpoint untuk mengambil detail film berdasarkan ID
app.get('/api/movies/:id', async (req, res) => {
    const movieId = req.params.id; // Ambil ID film dari parameter URL
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil detail film.');
    }
});

// Mulai server
app.listen(port, () => {
    console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
