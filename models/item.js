/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reg_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'item',
    createdAt: false,
    updatedAt: false
  });
};
