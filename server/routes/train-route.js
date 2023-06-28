const router = require('express').Router();
const trainingController = require('../controllers/trainschedule-controller');

router.post('/createTraining', trainingController.saveTraining);
router.get('/getTraining', trainingController.getTraining);

module.exports = router;