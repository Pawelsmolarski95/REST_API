const express =  require('express');
const router = express.Router();
const ConcertControllers = require('./../controllers/concerts.controller');


router.route('/concerts').get(ConcertControllers.getAll);

router.route('/concert/:id').get(ConcertControllers.getById);

router.route('/concerts').post(ConcertControllers.postCon);

router.route('/concerts/:id').delete(ConcertControllers.deleteCon);

router.route('/concerts/:id').put(ConcertControllers.editCon);
 
module.exports = router;