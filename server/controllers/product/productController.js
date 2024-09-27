const categorydb = require('../../model/product/productCategoryModel')
const cloudinary = require('../../cloudinary/cloudinary')
const productsdb = require('../../model/product/productModel')
const productreviewdb = require("../../model/product/productReviewModel")

const AddCategory = async (req,res)=>{
    const {categoryname,description} = req.body

    if(!categoryname || !description){
        res.status(400).json({error:"Fill All Details"})
    }

    try {
        const existingcategory = await categorydb.findOne({categoryname})

        if(existingcategory){
            res.status(400).json({error:"Category Already Exists"})
        }else{
            const addcategory = new categorydb({categoryname,description})
            await addcategory.save()

            res.status(200).json(addcategory)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

const GetCategory = async (req,res)=>{
    try {
        const getAllCategory = await categorydb.find()
        res.status(200).json(getAllCategory)
    } catch (error) {
        res.status(400).json(error)
    }
}


const AddProducts = async(req,res)=>{
    const {categoryid} = req.query
    const file = req.file ? req.file.path:""
    const {productname, price, discount, quantity, description} = req.body

    if(!productname || !price || !discount || !quantity || !description || !file){
        res.status(400).json({error:"all fields required"})
    }

    try {
        const upload = await cloudinary.uploader.upload(file)

        const existingProduct = await productsdb.findOne({productname})

        if(existingProduct){
            res.status(400).json({error:"Product Already Exists"})
        }

        const addProduct = new productsdb(
            {productname, price, discount, quantity, description,categoryid,productimage:upload.secure_url}
        )

        await addProduct.save()
        res.status(200).json(addProduct)
    } catch (error) {
        res.status(400).json(error)
    }
}

const GetAllProducts = async(req,res)=>{
    const page = req.query.page || 1
    const categoryid = req.query.categoryid || ""
    const ITEM_PER_PAGE = 8

    const query = {}

    if(categoryid !=="all" && categoryid){
        query.categoryid = categoryid
    }
    try {
        const skip = (page-1)*ITEM_PER_PAGE
        //product count
        const count = await productsdb.countDocuments(query)
        

        const getAllProducts = await productsdb.find(query).limit(ITEM_PER_PAGE).skip(skip)
        const pageCount = Math.ceil(count/ITEM_PER_PAGE)
        
        res.status(200).json({getAllProducts,
                              Pagination:{totalProducts:count,pageCount}})
    } catch (error) {
        res.status(400).json(error)
    }
}

const GetSingleProduct = async(req,res)=>{
    const {productid} = req.params;

    try{
        const getSingleProductData = await productsdb.findOne({_id:productid})
        res.status(200).json(getSingleProductData)
    }catch(error){
        res.status(400).json(error)
    }
}


const GetLatestProducts = async(req,res)=>{
    try{
        const getNewProducts = await productsdb.find().sort({_id:-1});
        res.status(200).json(getNewProducts)
    } catch (error) {
        res.status(400).json(error)
    }
}

const DeleteProduct = async(req,res)=>{
    const {productid} = req.params
    try {
        const deleteProducts = await productsdb.findByIdAndDelete({_id:productid})
        res.status(200).json(deleteProducts)
    } catch (error) {
        res.status(400).json(error)
    }
}


const ProductReview = async(req,res)=>{
    const {productid} = req.params
    const {username,rating,description} = req.body
    
    if(!username || !rating || !description || !productid){
        res.status(400).json({error:"All Fields Required"})
    }
    
    try {
        const productreviewadd = new productreviewdb({userid: req.userMainId,productid,
            username,rating,description})

        await productreviewadd.save()

        res.status(200).json(productreviewadd)
    } catch (error) {
        res.status(400).json(error)
    }
}


const GetProductReviews = async(req,res)=>{
    const {productid} = req.params
    try {
        const getReviews = await productreviewdb.find({productid})
        res.status(200).json(getReviews)        
    } catch (error) {
        res.status(400).json(error)
    }
}

const DeleteProductReview = async(req,res)=>{
    const {reviewid} = req.params
    try {
        const reviewDelete = await productreviewdb.findByIdAndDelete({_id:reviewid})
        res.status(200).json(reviewDelete)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports= {AddCategory,GetCategory,AddProducts,
    GetAllProducts,GetSingleProduct,GetLatestProducts,DeleteProduct,ProductReview,GetProductReviews,DeleteProductReview}