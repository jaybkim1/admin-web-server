module.exports = function (sequelize, DataTypes) {
    const item = sequelize.define('Item', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        name: { 
            field: 'name', 
            type: DataTypes.STRING(50), 
            allowNull: true 
        },
        price: { 
            field: 'price', 
            type: DataTypes.DECIMAL(50), 
            allowNull: true 
        },
        category: { 
            field: 'category', 
            type: DataTypes.STRING(50), 
            allowNull: true 
        }
    }, {
        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'item'
    });

    return item;
};

/*
 Sequelize 참고
 DataTypes => http://docs.sequelizejs.com/en/v3/api/datatypes/
 Associations => http://docs.sequelizejs.com/en/v3/api/associations/
 Model Function => http://docs.sequelizejs.com/en/v3/api/model/
 */