let Product = require('../models/productModel')
let Customer = require('../models/customerModel')

var product = new Product()
var customer = new Customer()

exports.index = function (request, response) {
    Product.get(function (err, products) {
        if (err) {
            response.json(
                {
                    status: 'error',
                    code: 500,
                    message: err
                }
            )
        } else {
            response.json(
                {
                    status: 'success',
                    code: 200,
                    message: 'List of products',
                    data: products
                }
            )
        }
    })
}

exports.newCategory = function (request, response) {

    product.category = request.body.category

    product.save(function (err) {
        if (err) {
            response.json(
                {
                    status: 'error',
                    code: 500,
                    message: err
                }
            )
        } else {
            response.json({
                status: 'success',
                code: 200,
                message: 'category saved!',
                data: product
            })
        }
    })
}

exports.newProduct = function (request, response) {
    
    let product = {
        name: request.body.name,
        description: request.body.description,
        images: [
            {
                filename: request.file.filename,
                path: '/images/' + request.file.filename,
                mimetype: request.file.mimetype,
                originalname: request.file.originalname,
                size: request.file.size
            }
        ]
    }

    Product.updateOne({ "_id": request.body.categoryId }, { $push: { 'listProducts': product } }, function (err) {
        if (err) {
            response.json(
                {
                    status: 'error',
                    code: 500,
                    message: err
                }
            )
        } else {
            response.json(
                {
                    status: 'success',
                    code: 200,
                    message: 'product agregated!'
                }
            )
        }
    })

}

exports.detailProduct = function (request, response) {

    Product.find({ "_id": request.params.id }, { listProducts: { $elemMatch: { "name": request.params.name } } }, function (err, product) {
        if (err) {
            response.json(
                {
                    status: 'error',
                    code: 500,
                    message: err
                }
            )
        } else {
            response.json(
                {
                    status: 'success',
                    code: 200,
                    message: 'product found!',
                    data: product
                }
            )
        }
    })
}

exports.editProduct = function (request, response) {
    
    var producto = request.body
    
    let product = {
        name: producto.editname,
        description: producto.editdescription,
        images: [
            {
                _id: producto.imageId,
                filename: request.file.filename,
                path: '/images/' + request.file.filename,
                mimetype: request.file.mimetype,
                originalname: request.file.originalname,
                size: request.file.size
            }
        ]
    }

    Product.findOneAndUpdate({ '_id': producto.categoryId, 'listProducts._id': producto.productId }, { $set: { 'listProducts.$': product } }, function (err) {
        if (err) {
            response.json(
                {
                    status: 'error',
                    code: 500,
                    message: err
                }
            )
        } else {
            response.json(
                {
                    status: 'success',
                    code: 200,
                    message: 'product updated!'
                }
            )
        }
    }) 
}

exports.delete = function (request, response) {
    Product.updateOne({ "_id": request.body.idCategory }, { $pull: { "listProducts": { "_id": request.body.idProduct } } }, function (err) {
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
                    message: "product deleted!"
                }
            )
        }
    });
}

exports.contact = function (request, response) {

    customer.name = request.body.name
    customer.lastname = request.body.lastname
    customer.phone = request.body.phone
    customer.email = request.body.email
    customer.product = request.body.product

    customer.save(function (err) {
        if (err) {
            response.json(
                {
                    status: 'error',
                    code: 500,
                    message: err
                }
            )
        }
        response.json({
            status: 'success',
            code: 200,
            message: 'contact saved!',
            data: customer
        })
    })
}

exports.showCustomers = function (request, response) {
    Customer.get(function (err, customer) {
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
                    message: "customers!",
                    data: customer
                }
            )
        }
    })
}
/*
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"category":"cupcakes","description":"abcdxyz","file":"imagen","name":"pastel", "price":"20000"}' \
  http://localhost:3000/api/product

*/
/*
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"nombre":"cupcakes","genero":"abcdxyz"}' \
  http://localhost:3001/api/persona
*/