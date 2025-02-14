// routes/home.js
const express = require('express')
const router = express.Router()

//Middlewares
const uploadProd = require('../middlewares/multerProdM');
const authMiddleware = require('../middlewares/authMiddleware');
const createProdMW = require('../middlewares/createProdMW')
const modifProdMW = require('../middlewares/modifProdMW')

// CONTROLLER
const productsCtrl = require('../controllers/productsController')

//* USER: ADMIN

//- LISTAR PRODUCTO
router.get('/',authMiddleware, productsCtrl.listarProducto)

//- CREATE PRODUCT 
router.get('/create', productsCtrl.crearProducto)
router.post('/create', uploadProd.single('productImg'), createProdMW , productsCtrl.productoCreado)

//- EDIT PRODUCT
router.get('/:id/edit', productsCtrl.editarProducto)
router.put('/:id/edit', uploadProd.single('productImg'), modifProdMW, productsCtrl.productoEditado)

//- DELETE PRODUCT
router.get('/delete/:id',productsCtrl.delete)
router.post('/destroy/:id', productsCtrl.destroy)

//- SEARCH PRODUCT
router.post('/search', productsCtrl.search)


//- ORDERNES
router.post('/crearOrden',productsCtrl.crearOrden)



// exports
module.exports = router