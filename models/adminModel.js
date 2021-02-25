const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: { type: String },
    password: { type: String }
})

var Administrator = module.exports = mongoose.model('administrator', adminSchema)

module.exports.get = function (callback, limit) {
    Administrator.find(callback).limit(limit)
}