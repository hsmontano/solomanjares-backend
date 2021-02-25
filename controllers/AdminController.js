let Administrator = require('../models/adminModel')

exports.login = function (request, response) {

    Administrator.find({ password: request.body.password }, (err, administrator) => {
        if (err) {
            response.json(
                {
                    status: 'error',
                    code: 500,
                    message: err
                }
            )
        }

        if (Array.isArray(administrator) && administrator.length) {
            response.json(
                {
                    status: 'success',
                    code: 201,
                    message: 'login successful!',
                    data: administrator
                }
            )
        } else {
            response.json(
                {
                    status: 'empty',
                    code: 403,
                    message: 'password incorrect!'
                }
            )
        }
    })
}

exports.newAdmin = function (request, response) {
    let admin = new Administrator()
    admin.name = request.body.name
    admin.password = request.body.password
    admin.save(function (err) {
        if (err) {
            response.json(
                {
                    status: "error",
                    code: 500,
                    message: err
                }
            )
        } else {
            response.json(
                {
                    status: "success",
                    code: 200,
                    message: "saved!",
                    data: admin
                }
            )
        }
    })
}
