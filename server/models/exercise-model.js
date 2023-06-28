module.exports = (sequelize, DataTypes) => {
    return sequelize.define('exercise', {
            exercise_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            company: {type: DataTypes.INTEGER, allowNull: false},
            platoon_number: {type: DataTypes.INTEGER, allowNull: false},
            soldier_id: {type: DataTypes.INTEGER, allowNull: false},
            exercise: {type: DataTypes.STRING, allowNull: false},
            result: {type: DataTypes.STRING, allowNull: false}
        }, {timestamps: false}
    );
}
