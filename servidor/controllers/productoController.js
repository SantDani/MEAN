const Producto = require('../models/Producto')

exports.crearProducto = async (req, res) => {
    /*console.log('desde crear producto');
    console.log(req.body);*/

    try {
        let producto;

        // Crear producto
        producto = new Producto(req.body);
        await producto.save();

        res.send(producto);
    }catch (error){
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
}

exports.getProducts = async (req, res) => {
    try {
       const productos = await Producto.find();
       res.json(productos);
    }catch (error){
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
}

exports.getProduct = async (req, res) => {
    try {
        let producto = await  Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: "NO existe el producto"});
        }

        res.json(producto)
    }catch (error){
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
}

exports.updateProduct = async (req, res) => {

    try {
        console.log('REQUEST ',req)
       const {nombre, categoria, ubicacion, precio} = req.body;
       let producto = await  Producto.findById(req.params.id);

       if(!producto){
           res.status(404).json({msg: "NO existe el producto"});
       }

       producto.nombre = nombre;
       producto.categoria = categoria;
       producto.ubicacion = ubicacion;
       producto.precio = precio;

       producto = await  Producto.findOneAndUpdate({_id: req.params.id}, producto, {new: true});

       res.json(producto);
    }catch (error){
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        console.log("ID", req.params.id)
        let producto = await  Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: "NO existe el producto"});
        }

        await Producto.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Producto eliminado correctamente'})
    }catch (error){
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
}
