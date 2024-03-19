const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = function (req, res, next) {
    // req is an object

    // Client will headers called authorization which contains JWT
    try {
        const token = req.headers.authorization // Basic Authentication -> Bearer Authentication

        // check if request header authorization sent or not
        if(!token) {
            return res.status(401).json({
                status: 'fail',
                message: "required authorization"
            })
        }

        const payload = jwt.verify(token, 'rahasia');
        console.log('Payload:', payload)
        User.findByPk(payload.id)
            .then(instance => {
                req.user = instance;
                next()
            })
    }

    catch {
        res.status(401).json({
            status: 'fail',
            message: "Invalid Token"
        })
    }
}