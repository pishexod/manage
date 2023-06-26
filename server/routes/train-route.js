const router = require('express').Router();
const trainingController = require('../controllers/trainschedule-controller');

router.post('/createTraining', trainingController.saveTraining);

module.exports = router;