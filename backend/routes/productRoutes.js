const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);
router.put('/update', productController.updateProduct);
router.post('/sell', productController.sellProduct);
router.post('/delete', productController.deleteProduct);

module.exports = router;
