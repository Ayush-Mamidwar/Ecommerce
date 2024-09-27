const express = require('express')
const adminAuthenticate = require('../../middleware/admin/adminAuthenticate')
const   router = express.Router()
const {AddCategory,GetCategory,AddProducts,GetAllProducts,GetSingleProduct,GetLatestProducts,
    DeleteProduct,ProductReview,GetProductReviews,DeleteProductReview} = require('../../controllers/product/productController')
const productUpload = require('../../multerconfig/product/productStorageConfig')
const userAuthenticate = require('../../middleware/user/userAuthenticate')

//product routes
router.post('/addcategory',adminAuthenticate,AddCategory)
router.get('/getallcategory',GetCategory)


//products routes
router.post("/addProducts",[adminAuthenticate,productUpload.single("productimage")],AddProducts)
router.get('/getProducts',GetAllProducts)
router.get('/getSingleProduct/:productid',GetSingleProduct)
router.delete("/products/:productid",adminAuthenticate,DeleteProduct)


//new arrival products
router.get("/getLatestProducts",GetLatestProducts)


//product review api
router.post('/productreview/:productid',userAuthenticate,ProductReview)
router.get('/getproductreview/:productid',GetProductReviews)
router.delete('/productreviewdelete/:reviewid',userAuthenticate,DeleteProductReview)

module.exports = router