module.exports = (sequelize, DataTypes) => {
    return sequelize.define('trainingschedule', {
            schedule_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            platoon: {type: DataTypes.INTEGER, allowNull: false},
            exercise: {type: DataTypes.STRING, allowNull: false},
            date: {type: DataTypes.STRING, allowNull: false},
        }, {timestamps: false}
    );
}
