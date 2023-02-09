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

exports.getPerformer = async (req, res) => {
    try {
        const performerId = req.params.performer
        const per = await Concert.find({ performer: performerId });
        
        if(!per) {
            res.status(404).json({ message: 'Not found'});
        } else {
            res.json(per)
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getGenre = async (req, res) => {
    try {
        const genreId = req.params.genre
        const gen = await Concert.find({ genre: genreId });
        
        if(!gen) {
            res.status(404).json({ message: 'Not found'});
        } else {
            res.json(gen)
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getMinMaxPrice = async (req, res) => {
    try {
        const priceMin = req.params.price_min;
        const priceMax = req.params.price_max;
        const minMaxPri = await Concert.find({ price: { $gte: priceMin ,$lte: priceMax  }});
        
        if(!minMaxPri) {
            res.status(404).json({ message: 'Not found'});
        } else {
            res.json(minMaxPri)
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getConcertDay = async (req, res) => {
    try {
        const dayId = req.params.day;
        const filterConcerts = await Concert.find({ day: dayId });
        
        if(!filterConcerts) {
            res.status(404).json({ message: 'Not found'});
        } else {
            res.json(filterConcerts)
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
