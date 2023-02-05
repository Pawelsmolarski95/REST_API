const express =  require('express');
const router = express.Router();
const ConcertControllers = require('./../controllers/concerts.controller');


router.route('/concerts').get(ConcertControllers.getAll);

router.route('/concert/:id').get(ConcertControllers.getById);

router.route('/concerts').post(ConcertControllers.postCon);

router.route('/concerts/:id').delete(ConcertControllers.deleteCon);

router.route('/concerts/:id').put(ConcertControllers.editCon);

router.route('/concerts/performer/:performer').get(ConcertControllers.getPerformer);

router.route('/concerts/genre/:genre').get(ConcertControllers.getGenre);

router.route('/concerts/price/:price_min/:price_max').get(ConcertControllers.getMinMaxPrice);

router.route('/concerts/day/:day').get(ConcertControllers.getConcertDay);


 
module.exports = router;