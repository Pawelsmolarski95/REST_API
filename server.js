const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
 
app.use((req, res) => {
    res.status(404).json({ message: '404 not found...'})
});
app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });