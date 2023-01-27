const express = require('express');
const router = express.Router();
const TestimonialControllers = require('./../controllers/testimonials.controller');

router.route('/testimonials').get(TestimonialControllers.getAll);

router.route('/testimonials/:id').get(TestimonialControllers.getById);

router.route('/testimonials/random').get(TestimonialControllers.randomTest);
 
router.route('/testimonials').post(TestimonialControllers.postTest);
 
router.route('/testimonials/:id').put(TestimonialControllers.editTest);
 
router.route('/testimonials/:id').delete(TestimonialControllers.deleteTest);
 
module.exports = router;