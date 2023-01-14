const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuid = require('uuid');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
 });
router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials[req.params.id]);
 });
router.route('/testimonials/random').get((req, res) => {
    const randomNumber = Math.floor(Math.random() * db.length+1);
    db.testimonials > 0 
    ? res.json(db.testimonials.find(e => e.id === randomNumber))
    : res.status(404).json({ message: 'Something was wrong...'});
 });
 
router.route('/testimonials').post((req, res) => {    
    const newElements = {
        id: uuid.v4(),
        author: req.body.author,
        text: req.body.text
     };
     db.testimonials.push(newElements);
     res.json({ message: "OK"});
 });
 
router.route('/testimonials/:id').put((req, res) => {   
    const editElement = db.testimonials.find(element => element.id == req.params.id);
        editElement.id = uuidv4(),
        editElement.author = req.body.author,
        editElement.text = req.body.text,
        db.testimonials = db.testimonials.map(item => item.id == req.params.body? editElement : item)
        res.json({ message: "OK"});
 });
 
router.route('/testimonials/:id').delete((req, res) => {
     db.testimonials = db.testimonials.filter(e => e.id != req.params.id)
     res.json({ message: "OK"}); 
 });
 
 module.exports = router;