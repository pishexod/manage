const db = require('../models');
require('dotenv').config()

const getExercise = async (req, res) => {
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
    let {
        company, platoon_number, soldier_id, run3km, run100m, run6x100, pullup, rating_run3km,
        rating_run100m,
        rating_run6x100,
        rating_pullup
    } = req.body;
    try {
        const exercise = await db.exercise.findOne({
            where: {
                soldier_id: soldier_id
            }
        })
        if (!exercise) {
            let newExercise = await db.exercise.create({
                company,
                platoon_number,
                soldier_id,
                run3km,
                run100m,
                run6x100,
                pullup,
                rating_run3km,
                rating_run100m,
                rating_run6x100,
                rating_pullup

            });
            return res.json({status: true, message: 'Тренування створено', exercise: newExercise});
        } else {
            if (run3km !== 'Не здавав') {
                exercise.run3km = run3km;
                exercise.rating_run3km = rating_run3km;
            }
            if (run100m !== 'Не здавав') {
                exercise.run100m = run100m;
                exercise.rating_run100m = rating_run100m;
            }
            if (run6x100 !== 'Не здавав') {
                exercise.run6x100 = run6x100;
                exercise.rating_run6x100 = rating_run6x100;
            }
            if (pullup !== 'Не здавав') {
                exercise.pullup = pullup;
                exercise.rating_pullup = rating_pullup;
            }
            await exercise.save();
            return res.json({
                status: true,
                message: 'Солдата оновлено',
                soldier: exercise,
            });
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {saveExercise, getExercise}