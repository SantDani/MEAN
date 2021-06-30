// Rutas de producto
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController')



/*router.post('/', ()=> {
    console.log('Creando producto...');
})*/

// api/productos

router.post('/', productoController.crearProducto);
router.get('/', productoController.getProducts);
router.put('/:id', productoController.updateProduct);
router.get('/:id', productoController.getProduct);
router.delete('/:id', productoController.eliminarProducto);


module.exports = router
