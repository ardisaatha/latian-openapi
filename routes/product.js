const router = require('express').Router()

// controller
const Product = require('../controller/productController')

// middleware
const Authentication = require('../middlewares/authenticate')
const Uploader = require('../middlewares/uploader')

router.post('/', Authentication, Uploader.single('image'), Product.createProduct)
router.get('/', Authentication, Product.findProducts)
router.get('/:id', Authentication, Product.findProductById)
router.put('/:id', Authentication, Product.updateProduct)
router.delete('/:id', Authentication, Product.deleteProduct)

module.exports = router