const config_Db = require('../config/database');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    config_Db.database, config_Db.username, config_Db.password, config_Db.options
);
sequelize.authenticate().then(() => {
    console.log('connected');
}).catch(err => {
    console.log(err);
})
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user-model.js')(sequelize, DataTypes);
db.soldiers = require('./soldier-model')(sequelize, DataTypes);
db.sequelize.sync({force: false}).then(() => {
    console.log('re-sync done')
});
module.exports = db;