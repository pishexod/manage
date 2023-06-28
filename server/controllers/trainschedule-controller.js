const db = require('../models');
require('dotenv').config()

const getTraining = async (req, res) => {
    console.log(req.query);
    try {
        const trainings = await db.train.findAll({})
        res.json({status: true, data: trainings})
    } catch (e) {
        console.log(e)
    }
}
const saveTraining = async (req, res) => {
    let {platoon, exercise, date} = req.body;
    console.log(req.body)
    try {
        let newTraining = await db.train.create({platoon, exercise, date});
        return res.json({status: true, message: 'Тренування створено', training: newTraining});
    } catch (e) {
        console.log(e)
    }
}

module.exports = {saveTraining, getTraining}