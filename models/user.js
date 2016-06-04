module.exports = function(sequelize, DataTypes) {
    return sequelize.define("images", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            field: 'id'
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'firstName'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'lastName'
        },
        userName: {
            type: DataTypes.STRING,
            field: 'userName'
        }
    }, {
        ommitNull: false
    });
};
