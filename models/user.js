module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('user', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    return User;
};