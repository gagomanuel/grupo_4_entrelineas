const path = require("path");
const db = require("../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const fs = require("fs")
const about = {
    books: "Libros"
    }
const { validationResult} = require('express-validator');
//variable con la ruta del archivo products.json
//let productosFilePath = path.join(__dirname, '../data/products.json');

//let datos = fs.readFileSync(productosFilePath, "utf-8")

// OBJECT WITH DETAILED HTML DIRECTIONS
const productsController =  {
       listarProducto: (req, res) => {

        db.Product.findAll({ include: ["authors", "genres", "editorials", "productsTypes"] })
            .then((productos) => {

            res.render("products/listarProducto", { books: productos });
            });
        
    
     },

    editarProducto: (req,res) => {
        
        db.Product.findOne({
            include: ["authors", "genres", "editorials", "productsTypes"],
            where: { id: req.params.id }
            })
            .then(function (prductToShow) {db.Genre.findAll()
                .then(function(todosLosGeneros){
                    let allGenres = todosLosGeneros
                    db.Author.findAll()
                        .then(function(todosLosAutores){
                            let allAuthors = todosLosAutores
                            db.Editorial.findAll()
                            .then(function(todasLasEditoriales){
                                let allEditorials = todasLasEditoriales
                                db.ProductType.findAll()
                                .then(function(todosLosProductTypes){
                                    let allProductsTypes = todosLosProductTypes
                                    return res.render('products/editarProducto', { 
                                        product: prductToShow,
                                        allGenres: allGenres,
                                        allAuthors: allAuthors,
                                        allEditorials: allEditorials, 
                                        allProductsTypes: allProductsTypes, 
                                })
                            })
                        })
                    })
                })
            })
    
    },
    
    productoEditado:(req,res) => {
        // - crear validador de epxress y retornar vista con errores en caso de que haya
        // return res.redirect('products/editarProducto', {errors: resValidation.mapped()})
        // ! mandar todos los db.model.findAll() 
        const resValidation = validationResult(req)
        if (resValidation.errors.length > 0) {
            db.Product.findOne({
                include: ["authors", "genres", "editorials", "productsTypes"],
                where: { id: req.params.id }
                })
                .then(function (prductToShow) {db.Genre.findAll()
                    .then(function(todosLosGeneros){
                        let allGenres = todosLosGeneros
                        db.Author.findAll()
                            .then(function(todosLosAutores){
                                let allAuthors = todosLosAutores
                                db.Editorial.findAll()
                                .then(function(todasLasEditoriales){
                                    let allEditorials = todasLasEditoriales
                                    db.ProductType.findAll()
                                    .then(function(todosLosProductTypes){
                                        let allProductsTypes = todosLosProductTypes
                                        return res.render('products/editarProducto', { 
                                            product: prductToShow,
                                            allGenres: allGenres,
                                            allAuthors: allAuthors,
                                            allEditorials: allEditorials, 
                                            allProductsTypes: allProductsTypes, 
                                            oldData: req.body,
                                            errors: resValidation.mapped() })
                                    })
                                })
                            })
                        })
                    })
        } else {
            let image;
    
            if (!req.file) {
                db.Product.findOne({
                    where: { id: req.params.id }
                })
                .then( resultado => {
                    image = resultado
                    console.log(image)
                })
            } else {
                image = `/img/products/${req.file}`;
            }
            // image = req.body.filename;
            
            let updatedProduct = {
                name : req.body.name,
                price: req.body.price,
                opinion: req.body.about,
                size: req.body.size,
                stock: req.body.stock,
                pages: req.body.pages,
                more: req.body.more,
                picture: image,
                id_author: req.body.author,
                id_genre: req.body.genre,
                id_productType: req.body.type,
                id_editorial: req.body.editorial
            }

            db.Product.update( updatedProduct ,{
                where: {id : req.params.id}
            })
                .then( product => {
                    return res.redirect('/products')
                })
        }
    },
    // products creación por get
    crearProducto: (req, res) => {
         db.Genre.findAll()
            .then(function(todosLosGeneros){
                let allGenres = todosLosGeneros
                db.Author.findAll()
                    .then(function(todosLosAutores){
                        let allAuthors = todosLosAutores
                        db.Editorial.findAll()
                        .then(function(todasLasEditoriales){
                            let allEditorials = todasLasEditoriales
                            db.ProductType.findAll()
                            .then(function(todosLosProductTypes){
                                let allProductsTypes = todosLosProductTypes
                                res.render("products/crearProducto", { allGenres, allAuthors, allEditorials, allProductsTypes});
                            })
                        })
                    })
            });
       
            },
        

    // /products proceso de creación por (POST)
    productoCreado: (req,res) =>{
        // - crear validador de epxress y retornar vista con errores en caso de que haya
        // res.render("products/crearProducto", { allGenres, allAuthors, allEditorials, allProductsTypes});
        // ! mandar todos los db.model.findAll() para de crear 
        const resValidation = validationResult(req)
        if (resValidation.errors.length > 0) {
            db.Genre.findAll()
            .then(function(todosLosGeneros){
                let allGenres = todosLosGeneros
                db.Author.findAll()
                    .then(function(todosLosAutores){
                        let allAuthors = todosLosAutores
                        db.Editorial.findAll()
                        .then(function(todasLasEditoriales){
                            let allEditorials = todasLasEditoriales
                            db.ProductType.findAll()
                            .then(function(todosLosProductTypes){
                                let allProductsTypes = todosLosProductTypes
                                return res.render('products/crearProducto',{
                                    errors: resValidation.mapped(),
                                    oldData: req.body,
                                    allGenres: allGenres,
                                    allAuthors: allAuthors,
                                    allEditorials: allEditorials,
                                    allProductsTypes: allProductsTypes
                                });
                            })
                        })
                    })
                })         
             }    
        else {  
        
            let image = '';
        if (req.file) {
            //le saco la palabra public para que sea a partir
          image = req.file.filename;
        
        }

        let newProduct = {
            name: req.body.productName,
            price: req.body.price,
            opinion: req.body.about,
            size: req.body.size,
            stock: req.body.stock,
            pages: req.body.pages,
            more: req.body.more,
            picture: "/img/products/"+image,
            id_author: req.body.author,
            id_genre: req.body.genre,
            id_productType: req.body.type,
            id_editorial: req.body.editorial
            
        };
       
        db.Product.create(newProduct)
            .then(function(product){
                return res.redirect('/products')
            })}
       
        
            
    },
    delete: async function (req, res) {
        db.Product.destroy({
        where: {id: req.params.id}
    });

    // await db.Movie.destroy({
    //     where:{id:req.params.id,force:true}
    // })

    res.redirect("/products");
    },

    search: function(req, res){
    //db.Movie.findOne({where: {title: {[Op.like]:'%'+req.body.titulo+'%'} }})
    db.Product.findAll({ include: ["authors", "genres", "editorials", "productsTypes"],
                            where: {name: {[Op.like]:'%'+req.body.search+'%'} }})
    .then((productos) => {

    res.render("products/listarProducto", { books: productos });
    });
    }
}




// exports
module.exports = productsController