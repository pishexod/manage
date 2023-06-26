const db = require('../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()


const registration = async (req, res) => {
    let {username, password, company} = req.body;
    try {
        let user = await db.users.findOne({
            where: {username: username}
        });
        if (!user) {
            let hashedPassword = await bcrypt.hash(password, 3);
            let newUser = await db.users.create({username, password: hashedPassword, company});
            const token = jwt.sign({user}, "jwt-secret-suka-token", {expiresIn: "24h"});
            return res.json({status: true, message: 'Користувача створено', token, user: newUser});
        }
        res.json({status: false, message: 'Такий користувач вже існує'});
    } catch (err) {
        console.log(err);
        res.json({status: false, message: 'server error'});
    }
};


const login = async (req, res) => {
    let {username, password} = req.body;
    try {
        let user = await db.users.findOne({
            where: {username: username}
        });
        if (user) {
            const isPasswordEquals = await bcrypt.compare(password, user.password);
            if (isPasswordEquals) {
                const token = jwt.sign({user}, "jwt-secret-suka-token", {expiresIn: "24h"});
                return res.json({status: true, token, user});
            }
            return res.json({status: false, message: 'Неправильний пароль або логін'});
        }
        res.json({status: false, message: 'Користувача не знайдено'});

    } catch (err) {
        console.log(err);
        res.json({status: false, message: 'server error'});
    }
};

const verifyJWT = (req, res, next) => {
    const token = req.headers['access-token'];
    console.log(token);
    if (!token) {
        console.log('need token');
        res.status(401).json({status: false, message: "Ми потребуємо токен"}); // Оновлено: Виправлено статус відповіді на 401
    } else {
        jwt.verify(token, "jwt-secret-suka-token", (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).json({status: false, message: "Недійсний токен"}); // Оновлено: Виправлено статус відповіді на 401
            } else {
                req.user = decoded.user; // Збереження ідентифікатора користувача у req об'єкті
                next();
            }
        });
    }
};


module.exports = {registration, login, verifyJWT};