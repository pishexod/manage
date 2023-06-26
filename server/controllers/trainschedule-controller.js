const db = require('../models');
require('dotenv').config()


const saveTraining = async (req, res) => {
    let {id,platoon, exercise, date} = req.body;
    console.log(platoon)
    try {
        let newTraining = await db.train.create({platoon, exercise, date});
        return res.json({status: true, message: 'Тренування створено', training: newTraining});
    } catch (e) {
        console.log(e)
    }
}

module.exports = {saveTraining}