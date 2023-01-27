const Seat = require('./../models/seats.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    } 
};

exports.getById = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
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

exports.postSeat = async (req, res) => {
    try {
        const {day, seat, client, email} = req.body;
        const newSeat = new Seat({
            day: day,
            seat: seat,
            client: client,
            email: email
        });
        newSeat.save();
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteSeat = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(seat) {
            await Seat.deleteOne(req.params.id)
            res.json({ message: 'OK'});
        } else {
            res.status(404).json({ message: 'Not found'});
        }
    }
    catch(err) {
        res.status(500).json({ message: err });
    } 
};

exports.editSeat = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(seat) {
            await Seat.updateOne({ _id: req.params.id}, {
                $set: {
                    day: req.body.day,
                    seat: req.body.seat, 
                    client: req.body.client, 
                    email: req.body.email
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