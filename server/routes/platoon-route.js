const router = require('express').Router();
const platoonController = require('../controllers/platoon-controller');

router.post('/createPlatoon', platoonController.createPlatoon);
router.get('/getPlatoons', platoonController.getAllPlatoons);

module.exports = router;