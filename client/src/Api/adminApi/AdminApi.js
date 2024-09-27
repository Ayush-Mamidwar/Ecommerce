import { BASE_URL } from "../Helper";
import { commonrequest } from "../CommonRequest";

//admin register api
export const AdminRegisterApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/adminauth/api/register`,data,header,"admin")
}


//Admin login api
export const AdminLoginApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/adminauth/api/login`,data,header,"admin")
}

//AdminLoggedIn api
export const AdminLoggedInApi = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/adminauth/api/adminverify`,"",header,"admin")
}

//AdminLogout api
export const AdminLogoutApi = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/adminauth/api/logout`,"",header,"admin")
}