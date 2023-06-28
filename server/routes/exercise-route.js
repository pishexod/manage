const router = require('express').Router();
const exerciseController = require('../controllers/exercise-controller');

router.post('/createExercise', exerciseController.saveExercise);
router.get('/getExercise', exerciseController.getExercise);

module.exports = router;