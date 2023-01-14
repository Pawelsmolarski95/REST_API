const express =  require('express');
const router = express.Router();
const db = require('./../db');
const uuid  = require('uuid');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});
router.route('/concert/:id').get((req, res) => {
    res.json(db.concerts[req.params.id]);
});
router.route('/concerts').post((req, res) => {
    
    const newConcert = {
        id: uuid.v4(),
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price, 
        day: req.body.day,
        image: req.body.image     
    }
    db.concerts.push(newConcert);
    res.json({message: 'OK'})
});

router.route('/concerts/:id').delete((req, res) => {
    db.concerts = db.concerts.filter(e => e.id != req.params.id);
    res.json({message: 'OK'});
});
router.route('/concerts/:id').put((req, res) => {
    
    const editConcert = db.concerts.find(e => e.id == req.params.id);
    
        editConcert.id = uuidv4(),
        editConcert.performer = req.body.performer,
        editConcert.genre = req.body.genre,
        editConcert.price =req.body.price, 
        editConcert.day = req.body.day
        editConcert.image = req.body.image

    db.concerts = db.concerts.map(e => e.id == req.params.id ? editConcert : e)
    res.json({message: 'OK'});
 });
 
 module.exports = router;