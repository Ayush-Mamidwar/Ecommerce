import { BASE_URL } from "../Helper";
import { commonrequest } from "../CommonRequest";

//Add Product Category API
export const AddCategoryApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/product/api/addcategory`,data,header,"admin")
}

//Get Category API
export const GetCategoryApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/product/api/getallcategory`,"",header,"admin")
}

//Add Product API 
export const AddProductsApi = async(data,categoryid,header)=>{
    return await commonrequest("POST",`${BASE_URL}/product/api/addProducts?categoryid=${categoryid}`,data,header,"admin")
}

//Add Products API 
export const GetProductsApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/product/api/getProducts?categoryid=${data.selectedCategory}&page=${data.page}`,"",header,"admin")
}

//Add Products API 
export const DeleteProductApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/product/api/products/${data.productid}`,{},header,"admin")
}

//Get Latest Products API 
export const GetLatestProductApi = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/product/api/getLatestProducts`,"",header,"user")
}

// GetSingleProductsApi
export const GetSingleProductsApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/product/api/getSingleProduct/${data.productid}`,"",header,"user")
}

//AddReviewApi
export const AddReviewApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/product/api/productreview/${data.productid}`,data.data,header,"user")
}

// ProductReviewApi
export const ProductReviewApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/product/api/getproductreview/${data.productid}`,"",header,"user")
}


// ReviewDeleteApi
export const ReviewDeleteApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/product/api/productreviewdelete/${data.reviewid}`,{},header,"user")
}