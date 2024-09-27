import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AddCategoryApi, AddProductsApi, AddReviewApi, DeleteProductApi, GetCategoryApi, GetLatestProductApi, GetProductsApi, GetSingleProductsApi, ProductReviewApi, ReviewDeleteApi } from "../../../Api/productApi/ProductApi";


//Add Category
export const AdminAddCategory = createAsyncThunk("AdminAddCategory",async(data)=>{
    try {
        const response = await AddCategoryApi(data)
        
        if(response.status === 200){
            toast.success("Category Successfully Added.")
            return response.data
        }
        else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
})


//Get Category
export const GetCategory = createAsyncThunk("GetCategory",async(thunkApi)=>{
    try {
        const response = await GetCategoryApi()
        
        if(response.status === 200){
            // toast.success("Category Successfully Added.")
            return response.data
        }
        else{
            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error;
    }
})

//Add product Slice
export const AddProducts = createAsyncThunk("AddProduct",async(data)=>{
    try {
        const response = await AddProductsApi(data.data, data.categoryid, data.config)
        
        if(response.status === 200){
            toast.success("Product Successfully Added.")
            return response.data
        }
        else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
})


//Get Product Slice
export const GeAlltProducts = createAsyncThunk("GetAllProducts",async(data)=>{
    try {
        const response = await GetProductsApi(data)
        
        if(response.status === 200){
            return response.data
        }
        else{
            toast.error(response.response.data.error)   
        }
    } catch (error) {
        throw error;
    }
})

//Delete Product Slice
export const DeleteProducts = createAsyncThunk("DeleteProducts",async(data)=>{
    try {
        const response = await DeleteProductApi(data)
        
        if(response.status === 200){
            toast.success("Product Deleted Successfully.")   
            return response.data
        }
        else{
            toast.error("Error.")   
        }
    } catch (error) {
        throw error;
    }
})

//get latest products Slice
export const GetLatestProducts = createAsyncThunk("GetLatestProducts",async(thunkApi)=>{
    try {
        const response = await GetLatestProductApi()
        if(response.status === 200){
            // toast.success("Product Deleted Successfully.")   
            return response.data
        }
        else{
            thunkApi.rejectWithValue("error")  
        }
    } catch (error) {
        throw error;
    }
})

//GetSingleProducts
export const GetSingleProducts = createAsyncThunk("GetSingleProducts",async(data)=>{
    try {
        const response = await GetSingleProductsApi(data)
        if(response.status === 200){
            return response.data
        }
        else{
            toast.error("Error")
        }
    } catch (error) {
        throw error;
    }
})


//Add Review slice
export const AddReview = createAsyncThunk("AddReview",async(data)=>{
    try {
        const response = await AddReviewApi(data)
        if(response.status === 200){
            toast.success("Review Added Successfully.")
            return response.data
        }
        else{
            toast.error("Error")
        }
    } catch (error) {
        throw error;
    }
})

//Product Review slice
export const ProductReview = createAsyncThunk("ProductReview",async(data)=>{
    try {
        const response = await ProductReviewApi(data)
        if(response.status === 200){
            return response.data
        }
        else{
            console.log("error")
        }
    } catch (error) {
        throw error;
    }
})

export const ReviewDelete = createAsyncThunk("ReviewDelete",async(data)=>{
    try {
        const response = await ReviewDeleteApi(data)
        if(response.status === 200){
            toast.success("Review Successfully Deleted")
            return response.data
        }
        else{
            toast.error('Error')
        }
    } catch (error) {
        throw error;
    }
})




//create reducer and action
export const ProductSlice = createSlice({
    name:"ProductSlice",
    initialState:{
        addCategoryData:[],
        categoryData:[],
        addProducts:[],
        productsData:[],
        deleteProducts:[],
        latestproducts:[],
        singleproduct:[],
        addproductreview:[],
        productreview:[],
        deletereview:[],
        loading:false,
        error:null
    },
    //extra reducer is a function which has builder which listned to changes to createAsyncThunk
    extraReducers:(builder)=>{
        //Add Category
        builder.addCase(AdminAddCategory.pending,(state)=>{
            state.loading = true
        })
        .addCase(AdminAddCategory.fulfilled,(state,action)=>{
            state.loading = false;
            state.addCategoryData = action.payload
        })
        .addCase(AdminAddCategory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //get category
        .addCase(GetCategory.pending,(state)=>{
            state.loading = true
        })
        .addCase(GetCategory.fulfilled,(state,action)=>{
            state.loading = false;
            state.categoryData = action.payload
        })
        .addCase(GetCategory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //Add Products
        .addCase(AddProducts.pending,(state)=>{
            state.loading = true
        })
        .addCase(AddProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.addProducts = action.payload
        })
        .addCase(AddProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //Get All Products
        .addCase(GeAlltProducts.pending,(state)=>{
            state.loading = true
        })
        .addCase(GeAlltProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.productsData = action.payload
        })
        .addCase(GeAlltProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //Delete Products
        .addCase(DeleteProducts.pending,(state)=>{
            state.loading = true
        })
        .addCase(DeleteProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.deleteProducts = [action.payload]
        })
        .addCase(DeleteProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //GetLatestProducts
        .addCase(GetLatestProducts.pending,(state)=>{
            state.loading = true
        })
        .addCase(GetLatestProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.latestproducts = [action.payload]
        })
        .addCase(GetLatestProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        // GetSingleProducts
        .addCase(GetSingleProducts.pending,(state)=>{
            state.loading = true
        })
        .addCase(GetSingleProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.singleproduct = [action.payload]
        })
        .addCase(GetSingleProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //AddReview
        .addCase(AddReview.pending,(state)=>{
            state.loading = true
        })
        .addCase(AddReview.fulfilled,(state,action)=>{
            state.loading = false;
            state.addproductreview = [action.payload]
        })
        .addCase(AddReview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //get product reviews
        .addCase(ProductReview.pending,(state)=>{
            state.loading = true
        })
        .addCase(ProductReview.fulfilled,(state,action)=>{
            state.loading = false;
            state.productreview = action.payload
        })
        .addCase(ProductReview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


        //ReviewDelete
        .addCase(ReviewDelete.pending,(state)=>{
            state.loading = true
        })
        .addCase(ReviewDelete.fulfilled,(state,action)=>{
            state.loading = false;
            state.deletereview = [action.payload]
        })
        .addCase(ReviewDelete.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })        

    }
})

export default ProductSlice.reducer;