const express =  require('express');
const router = express.Router();
const db = require('./../db');
const uuid = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});
router.route('/seats/:id').get((req, res) => {
    
    res.json(db.seats[req.params.id]);
});
router.route('/seats').post((req, res) => {
    
    const newSeat = {
        id: uuid.v4(),
        day: req.body.day,
        seat: req.body.seat, 
        client: req.body.client, 
        email: req.body.email
    }
    
    if(db.seats.some(element => element.day == req.body.day && element.seat == req.body.seat)) {  
            
        res.status(404).json({ message: "The slot is already taken..." })  
              
    } else {
            db.seats.push(newSeat);
            res.json({ message: 'OK' }) 
    }
});
router.route('/seats/:id').delete((req, res) => {
    db.seats = db.seats.filter(e => e.id != req.params.id)
    res.json({ message: 'OK' });
});
router.route('/seats/:id').put((req, res) => {

    const seatsToEdit = db.seats.find(e => e.id == req.params.id);
    
    seatsToEdit.id = uuidv4(),
    seatsToEdit.day = req.body.day,
    seatsToEdit.seat = req.body.seat, 
    seatsToEdit.client = req.body.client, 
    seatsToEdit.email = req.body.email

    db.seats = db.seats.map(e => e.id == req.params.id ? seatsToEdit : e);
    res.json({message: 'OK'});
 });
 
module.exports = router;