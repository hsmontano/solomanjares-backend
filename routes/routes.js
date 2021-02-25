let router = require('express').Router()

router.get('/', (req, res) => {
    res.json(
        {
            status: 'ok',
            code: 200,
            message: 'this is the root of the application'
        }
    )
})

var adminController = require('../controllers/AdminController')
//routes of the administrator
router.route('/admin')
    .post(adminController.login)

/*
router.route('/admin')
    .post(adminController.newAdmin)
 */

var productController = require('../controllers/ProductController')

//routes of the products
router.route('/products')
    .get(productController.index)

//routes of the category
router.route('/category')
    .post(productController.newCategory)

//routes of the product
router.route('/new-product')
    .post(productController.newProduct)

//routes of the product
router.route('/product')
    .post(productController.editProduct)

router.route('/product/:id/:name')
    .get(productController.detailProduct)

router.route('/product')
    .delete(productController.delete)

//routes of the contact
router.route('/contact-us')
    .post(productController.contact)

//routes of the customers    
router.route('/customers')
    .get(productController.showCustomers)

module.exports = router