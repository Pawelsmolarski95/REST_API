const Concert = require('./../models/concerts.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if(!con) {
            res.status(404).json({ message: 'Not found'});
        } else {
            res.json(con)
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.postCon = async (req, res) => {
    try {
       const { performer, genre, price, day, image } = req.body
       const newConcert = new Concert({
        performer: performer,
        genre: genre,
        price: price, 
        day: day,
        image: image
       });
       await newConcert.save();
       res.json({ message: 'OK'});
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteCon = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if(!con) {
            res.status(404).json({ message: 'Not found'});
        } else {
            await Concert.deleteOne(req.params.id);
            res.json({ message: 'OK'});
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.editCon = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const con = await Concert.findById(req.params.id);
        if(!con) {
            res.status(404).json({ message: 'Not found'});
        } else {
            await Concert.updateOne({ _id: req.params.id}, {
                $set: {
                    performer : performer,
                    genre : genre,
                    price : price, 
                    day : day,
                    image : image
                }
            })
            res.json({ message: 'OK'});
        }       
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};