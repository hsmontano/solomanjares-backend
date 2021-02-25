const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    category: { type: String },
    listProducts: [
        {
            name: { type: String },
            description: { type: String },
            images: [
                {
                    title: { type: String },
                    description: { type: String },
                    filename: { type: String },
                    path: { type: String },
                    mimetype: { type: String },
                    originalname: { type: String },
                    size: { type: Number }
                }
            ],
            created: {
                type: Date,
                default: Date.now
            }
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});

var Product = module.exports = mongoose.model('product', productSchema)

module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit)
}