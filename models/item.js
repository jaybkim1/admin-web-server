module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define('item', {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        category: DataTypes.STRING
    });

    return Item;
};