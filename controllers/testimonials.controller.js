const Testimonial = require('./../models/testimonials.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    } 
};

exports.getById = async (req, res) => {
    try {
        const seat = await Testimonial.findById(req.params.id);
        if(!seat) {
            res.status(404).json({ message: 'Not found'});
        } else {
            res.json(seat);
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    } 
};

exports.postTest = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTestimonial = new Testimonial({
            author: author,
            text: text
        });
        newTestimonial.save();
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteTest = async (req, res) => {
    try {
        const test = await Testimonial.findById(req.params.id);
        if(test) {
            await Testimonial.deleteOne(req.params.id)
            res.json({ message: 'OK'});
        } else {
            res.status(404).json({ message: 'Not found'});
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    } 
};

exports.editTest = async (req, res) => {
    try {
        const test = await Testimonial.findById(req.params.id);
        if(test) {
            await Testimonial.updateOne({ _id: req.params.id}, {
                $set: {
                    author: author,
                    text: text
                }
            })
        } else {
            res.status(404).json({ message: 'Not found'})
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.randomTest = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const test = await Testimonial.findOne().skip(rand);
        if(test) {
            res.json(test);
        } else {
            res.json({ message: 'Not found'})
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};