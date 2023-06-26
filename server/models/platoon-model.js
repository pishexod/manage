module.exports = (sequelize, DataTypes) => {
    return sequelize.define('platoon', {
            platoon_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            company: {type: DataTypes.INTEGER, allowNull: false},
            platoon_number: {type: DataTypes.INTEGER, allowNull: false},
        }, {timestamps: false}
    );
}
