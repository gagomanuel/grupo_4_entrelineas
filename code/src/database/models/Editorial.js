module.exports = (sequelize, dataTypes) => {

    let alias = 'Editorial';
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(40),
            allowNull: false
        }
    };
    let config = {
            tableName: 'editorials',
            timestamps: false
    };
    const Editorial = sequelize.define(alias, cols, config);
    Editorial.associate = function(models) {
        Editorial.hasMany(models.Product, { 
            as: "products",
            foreignKey: 'id_editorial',    
        })
    }

    return Editorial;

}