const express =  require('express');
const router = express.Router();
const SeatControllers = require('./../controllers/seats.controller');

router.route('/seats').get(SeatControllers.getAll);

router.route('/seats/:id').get(SeatControllers.getById);

router.route('/seats').post(SeatControllers.postSeat);

router.route('/seats/:id').delete(SeatControllers.deleteSeat);

router.route('/seats/:id').put(SeatControllers.editSeat);
 
module.exports = router;