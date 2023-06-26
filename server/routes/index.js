const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        success: 1,
        message: 'This is rest apis working'
    })
});

const userRouter = require('./user-route');
const authRouter = require('./auth');

router.use('/users', userRouter);
router.use('/auth', authRouter);

module.exports = router;