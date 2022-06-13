// LUGAR PARA FUTURAS BASES DE DATOS
const about = {
    books: "Libros"
    }
const fs = require("fs")
const path = require("path");

//variable con la ruta del archivo products.json
let productosFilePath = path.join(__dirname, '../data/products.json');

let datos = fs.readFileSync(productosFilePath, "utf-8")

// OBJECT WITH DETAILED HTML DIRECTIONS
const productsController =  {
    crearProducto: (req, res) => {
    return res.render('products/crearProducto')
    },

    listarProducto: (req, res) => {
    let books = JSON.parse(datos)
    res.render('products/listarProducto',{about: about, books: books})
    },

    editarProducto: (req,res) => {
    let books = JSON.parse(datos)
    let product = books.find(product => product.id == req.params.id)
    res.render('products/editarProducto', {product: product})
    },
    
    productoEditado:(req,res) => {
        let books = JSON.parse(datos)

        req.body.id = req.params.id;
        // req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        let booksUpdate = books.map((libro) => {
            if (libro.id == req.body.id) {
                return (libro = req.body);
            }
            return libro;
        })

        let booksActualizar = JSON.stringify(booksUpdate, null, 2);
        
        // redireccionar a '/productos'
        fs.writeFileSync(productosFilePath,booksActualizar,"utf-8")
        res.redirect('/products')
        },
    

    // /products proceso de creación por (POST)
    productoCreado: (req,res) =>{
        let datos = fs.readFileSync(productosFilePath)
        let books = JSON.parse(datos)

        let image = '';
        if (req.file) {
            //le saco la palabra public para que sea a partir
          image = req.file.filename;
        
        }
        console.log(req.file)

        let newProduct = {
            id: books[books.length -1].id + 1,
            name: req.body.productName,
            type: req.body.type,
            author: req.body.author,
            price: req.body.price,
            gender: req.body.gender,
            picture: "/img/products/"+image,
            opinion: req.body.opinion,
            size: req.body.size,
            pages: req.body.pages,
            more: req.body.more
        };
        console.log(newProduct)
        books.push(newProduct)

        let newbooks = JSON.stringify(books)
        fs.writeFileSync(productosFilePath, newbooks)
        
        return res.redirect('/')
    },
    delete: (req, res) => {
        // leer archivo
        let datos = fs.readFileSync(productosFilePath, "utf-8")
        let books = JSON.parse(datos)
        console.log('voy por acá');
        // ubicar el libro a borrar y hacer un array con el resto mediante filter
        let id = req.params.id;

        let booksToKeep = books.filter((book) => book.id !=id);
        //lo vuelvo a formato json
        let jsonBooksToKeep = JSON.stringify(booksToKeep, null, 2);
        // lo reescribo en el archivo
        fs.writeFileSync(productosFilePath, jsonBooksToKeep, "utf-8");
        //redirecciona a listado de libros
        return res.redirect('/products');

    }

}

// exports
module.exports = productsController