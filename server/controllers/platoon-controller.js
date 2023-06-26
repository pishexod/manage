const db = require('../models');
require('dotenv').config()
const createPlatoon = async (req, res) => {
    let {platoon_number, commander_id, company} = req.body;
    console.log(req.body)
    try {
        let platoons = await db.platoon.findOne({
            where: {
                platoon_Number: platoon_number,
            }
        });
        if (!platoons) {
            let platoon = await db.platoon.create({
                platoon_number, commander_id, company
            });
            return res.json({status: true, platoon});
        }
        res.json({status: false, message: 'Такий користувач вже існує'});
    } catch (err) {
        console.log(err);
        res.json({status: false, message: 'server error'});
    }
}
const getAllPlatoons = async (req, res) => {
    try {
        console.log(req.query)
        const platoons = await db.platoon.findAll({
            where: {
                company: req.query.company
            }
        });
        res.json({status: true, data: platoons});
    } catch (err) {
        console.log(err);
        res.json({status: false, message: 'server error'});
    }
};

module.exports = {getAllPlatoons, createPlatoon}