const express = require('express');
const mongoose = require('mongoose');
const socket = require('socket.io');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const path = require('path');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

mongoose.connect('mongodb+srv://pawelsmolarski95:pawel@cluster0.ic2ley1.mongodb.net/NewWaveDB?retryWrites=true&w=majority', {useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => {
  console.log('Error' + err);
})

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });
  
const io = socket(server);  

io.on('connection', (socket) => {
  console.log('New socket !' + socket.id);

})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());

app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatsRoutes);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
 
app.use((req, res) => {
    res.status(404).json({ message: '404 not found...'})
});


module.exports = server; 