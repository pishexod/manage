module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {type: DataTypes.STRING, unique: true, allowNull: false},
            surname: {type: DataTypes.STRING, unique: true, allowNull: false},
            rank: {type: DataTypes.STRING, allowNull: false},
            password: {type: DataTypes.STRING, allowNull: false},
            company: {type: DataTypes.INTEGER, allowNull: false}
        }, {timestamps: false}
    );
}
