const router = require("express").Router();
const authController = require('../controllers/auth-controller');

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/checkauth', authController.verifyJWT, (req, res) => {
    return res.json({status: true, user: req.user, message: "Авторизовано"});
});

module.exports = router;