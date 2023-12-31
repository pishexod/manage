const router = require('express').Router();
const userController = require('../controllers/user-controller');


router.get('/soldiers', userController.getAllUsers)
router.post('/createSoldiers', userController.addSoldiers)
router.post('/updateSoldier', userController.updateSoldier)
router.delete('/deleteSoldier', userController.deleteSoldier);

module.exports = router;