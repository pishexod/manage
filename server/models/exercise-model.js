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
            run3km: {type: DataTypes.STRING, allowNull: false},
            run100m: {type: DataTypes.STRING, allowNull: false},
            run6x100: {type: DataTypes.STRING, allowNull: false},
            pullup: {type: DataTypes.STRING, allowNull: false},
            rating_run3km: {type: DataTypes.INTEGER, allowNull: false},
            rating_run100m: {type: DataTypes.INTEGER, allowNull: false},
            rating_run6x100: {type: DataTypes.INTEGER, allowNull: false},
            rating_pullup: {type: DataTypes.INTEGER, allowNull: false},
        }, {timestamps: false}
    );
}
