const { Product } = require('../models')
const imagekit = require('../lib/imageKit')

const createProduct = async (req, res) => {
    const { name, price, stock, warehouseId } = req.body
    const file = req.file
    try {
        // validasi utk format file image
        const validFormat = file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif';
        if (!validFormat) {
            return res.status(400).json({
                status: 'failed',
                message: 'Wrong Image Format'
            })
        }

        // untuk dapat extension file nya
        const split = file.originalname.split('.')
        const ext = split[split.length - 1]

        // upload file ke imagekit
        const img = await imagekit.upload({
            file: file.buffer, //required
            fileName: `IMG-${Date.now()}.${ext}`, //required
        })

        // validasi user yg input punya warehouse nya gak
        if (req.user.warehouseId != warehouseId) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not owner of this warehouse'
            })
        }

        const newProduct = await Product.create({
            name,
            price,
            stock,
            warehouseId,
            image: img.url,
        })

        res.status(201).json({
            status: 'success',
            data: {
                newProduct
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

const findProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.status(200).json({
            status: 'Success',
            data: {
                products
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

const findProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            status: 'Success',
            data: {
                product
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body
        const id = req.params.id
        await Product.update({
            name,
            price,
            stock
        }, {
            where: {
                id
            }
        })
        res.status(200).json({
            status: 'Success',
            data: {
                id, name, price, stock
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        await Product.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            status: 'success',
            message: `Product dengan id ${id} terhapus`
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

module.exports = {
    createProduct,
    findProducts,
    findProductById,
    updateProduct,
    deleteProduct,
}
