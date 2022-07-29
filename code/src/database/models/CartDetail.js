module.exports = (sequelize, dataTypes) => {
    let alias = 'CartDetail';
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSGINED,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true
        },
        id_product:{
            type: dataTypes.INTEGER.UNSGINED,
        },
        item:{
            type: dataTypes.STRING(200),
            allowNull:false
        },
        description:{
            type: dataTypes.TEXT
        },
        price:{
            type:dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: 'cartsdetails',
        timestamps: false
    }

    const CartDetail = sequelize.define(alias,cols,config)

    // Asociaciones
    CartDetail.associate = (models) => {
        CartDetail.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'id_product'
        })

        CartDetail.hasMany(models.Cart, {
            as:'carts',
            foreignKey:'id_cartDetails'
        })

    }
    return CartDetail
}