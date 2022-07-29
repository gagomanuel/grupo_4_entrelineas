module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart'
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSGINED,
            primaryKey:true,
            allowNull:false,
            autoIncrement: true
        },
        id_user:{
            type: dataTypes.INTEGER.UNSGINED,
        },
        id_cartDetails: {
            type: dataTypes.INTEGER.UNSGINED,
        }
    }
    let config = {
        tableName: 'carts',
        timestamps: false
    }

    const Cart = sequelize.define(alias,cols,config)

    // Asociaciones
    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            as: 'users',
            foreignKey:'id_user'
        })
        Cart.belongsTo(models.CartDetail, {
            as: 'cartsdetails',
            foreignKey:'id_cartDetails'
        })
        
    }
    return Cart
}