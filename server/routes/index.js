const router = require('express').Router();

const userRouter = require('./user-route');
const authRouter = require('./auth');
const trainRouter = require('./train-route');
const platoonRouter = require('./platoon-route');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/training', trainRouter);
router.use('/platoon', platoonRouter);


module.exports = router;