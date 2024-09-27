import { BASE_URL } from "../Helper";
import { commonrequest } from "../CommonRequest";

//AddToCartApi API
export const AddToCartApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/carts/api/addtocart/${data}`,{},header,"user")
}

//GetUserCartApi
export const GetUserCartApi = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/carts/api/getcarts`,"",header,"user")
}

//RemoveSingleCartItemApi
export const RemoveSingleCartItemApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/carts/api/removesingleitem/${data}`,{},header,"user")
}

//RemoveCartItemApi
export const RemoveCartItemApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/carts/api/removeitems/${data}`,{},header,"user")
}

//DeletecartdataApi
export const DeletecartdataApi  = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/carts/api/removecartdata`,{},header,"user")
}
