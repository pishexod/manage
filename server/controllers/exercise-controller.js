const db = require('../models');
require('dotenv').config()

const getExercise = async (req, res) => {
    console.log(req.query);
    try {
        const exercise = await db.exercise.findAll({
            where: {
                company: req.query.company,
            },
            include: db.soldiers
        })
        res.json({status: true, data: exercise})
    } catch (e) {
        console.log(e)
    }
}
const saveExercise = async (req, res) => {
    let {company, platoon_number, soldier_id, exercise, result} = req.body;
    console.log(req.body)
    try {
        let newExercise = await db.exercise.create({company, platoon_number, soldier_id, exercise, result});
        return res.json({status: true, message: 'Тренування створено', exercise: newExercise});
    } catch (e) {
        console.log(e)
    }
}

module.exports = {saveExercise, getExercise}