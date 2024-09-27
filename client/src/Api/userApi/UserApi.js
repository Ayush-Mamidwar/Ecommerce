import { BASE_URL } from "../Helper";
import { commonrequest } from "../CommonRequest";

//user register api
export const registerApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/userauth/api/register`,data,header,"admin")
}

//user login api
export const loginApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/userauth/api/login`,data,header,"admin")
}

//user verify api
export const userLoggedInApi = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/userauth/api/userloggedin`,"",header,"user")
}

//user log out api
export const userLoggedOutApi = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/userauth/api/logout`,"",header,"user")
}


//forgot api
export const forgotPasswordApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/userauth/api/forgotpassword`,data,header,"user")
}


//forgot verify api
export const forgotPasswordVerifyApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/userauth/api/forgotpassword/${data.id}/${data.token}`,"",header,"user")
}


//reset password api
export const resetPasswordApi = async(data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/userauth/api/resetpassword/${data.id}/${data.token}`,data.passwordData,header,"user")
}

// getAlluserApi
export const getAlluserApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/userauth/api/getallusers?page=${data.page}`,"",header,"admin")
}

//DeleteUserApi
export const DeleteUserApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/userauth/api/userdelete/${data.userId}`,{},header,"admin")
}


//UserContactApi
export const UserContactApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/userauth/api/usercontact`,data,header,"user")
}