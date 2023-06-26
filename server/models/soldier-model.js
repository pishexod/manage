module.exports = (sequelize, DataTypes) => {
    return Soldiers = sequelize.define('soldiers', {
        soldier_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        platoon: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        company: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        soldier_rank: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level_physical_fitness: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });
};
