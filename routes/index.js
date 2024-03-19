const router = require('express').Router()

const Auth = require('./auth')
const Product = require('./product')
const Warehouse = require('./warehouse')

// API server
router.use('/api/v1/auth/', Auth)
router.use('/api/v1/products/', Product)
router.use('/api/v1/warehouses/', Warehouse)

module.exports = router
