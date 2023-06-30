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
const updateSoldier = async (req, res) => {
    const {soldier_id, name, surname, soldier_rank, level_physical_fitness} = req.body;
    console.log(req.body)
    try {
        const soldier = await db.soldiers.findByPk(soldier_id);
        // console.log(soldier)

        if (!soldier) {
            return res.json({
                status: false,
                message: 'Солдата не знайдено',
            });
        }
        if (name != null)
            soldier.name = name;
        if (surname != null)
            soldier.surname = surname;
        if (soldier_rank != null)
            soldier.soldier_rank = soldier_rank;
        if (level_physical_fitness != null)
            soldier.level_physical_fitness = level_physical_fitness;

        await soldier.save();

        return res.json({
            status: true,
            message: 'Солдата оновлено',
            soldier: soldier,
        });
    } catch (err) {
        console.log(err);
        return res.json({
            status: false,
            message: 'Помилка при оновленні солдата',
        });
    }
};
const deleteSoldier = async (req, res) => {
    const {soldier_id} = req.body;
    console.log(req.body)
    try {
        const soldier = await db.soldiers.findByPk(soldier_id);
        if (!soldier) {
            return res.json({
                status: false,
                message: 'Солдата не знайдено',
            });
        }

        await db.soldiers.destroy({
            where: {
                soldier_id: soldier_id
            }
        })

        return res.json({
            status: true,
            message: 'Солдата видалено',
            soldier: soldier,
        });
    } catch (err) {
        console.log(err);
        return res.json({
            status: false,
            message: 'Помилка при оновленні солдата',
        });
    }

}
module.exports = {addSoldiers, getAllUsers, updateSoldier, deleteSoldier}