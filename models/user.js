module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        email: { 
            field: 'email', 
            type: DataTypes.STRING(50), 
            allowNull: false 
        },
        password: { 
            field: 'password', 
            type: DataTypes.STRING(50), 
            allowNull: false 
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
        tableName: 'user'
    });

    return user;
};

/*
 Sequelize 참고
 DataTypes => http://docs.sequelizejs.com/en/v3/api/datatypes/
 Associations => http://docs.sequelizejs.com/en/v3/api/associations/
 Model Function => http://docs.sequelizejs.com/en/v3/api/model/
 */