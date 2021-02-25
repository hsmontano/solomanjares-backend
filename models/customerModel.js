const mongoose = require('mongoose')

//const productSchema = require('../models/productModel')

const customerSchema = mongoose.Schema({
    name: String,
    lastname: String,
    phone: String,
    email: String,
    product: String,
    created: {
        type: Date,
        default: Date.now
    }
})

var Customer = module.exports = mongoose.model('customer', customerSchema)

module.exports.get = function (callback, limit) {
    Customer.find(callback).limit(limit)
}