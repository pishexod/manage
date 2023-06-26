const db = require('../models');
require('dotenv').config()

const addSoldiers = async (req, res) => {
    let {user_id, platoon, company, name, surname, soldier_rank, level_physical_fitness} = req.body;
    try {
        let soldier = await db.soldiers.findOne({
            where: {
                name: name,
                surname: surname
            }
        });
        if (!soldier) {
            let soldier = await db.soldiers.create({
                user_id,
                platoon,
                company,
                name: name,
                surname,
                soldier_rank,
                level_physical_fitness
            });
            return res.json({status: true, message: `Додано ${soldier.name} ${soldier.surname}`, soldier});
        }
        res.json({status: false, message: 'Такий користувач вже існує'});
    } catch (err) {
        console.log(err);
        res.json({status: false, message: 'server error'});
    }
};

const getAllUsers = async (req, res) => {
    try {
        console.log(req.query)
        const soldiers = await db.soldiers.findAll({
            where: {
                company: req.query.company
            },
            indexes: ['index_company']
        });
        res.json({status: true, data: soldiers});
    } catch (err) {
        console.log(err);
        res.json({status: false, message: 'server error'});
    }
};

module.exports = {addSoldiers, getAllUsers}