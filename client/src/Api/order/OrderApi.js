import { BASE_URL } from "../Helper";
import { commonrequest } from "../CommonRequest";


export const AddOrderApi = async (data,header)=>{
    return await commonrequest("POST", `${BASE_URL}/order/api/addorders`,data,header,"user")
}

//UserOrdersApi
export const UserOrdersApi = async (data,header)=>{
    return await commonrequest("GET", `${BASE_URL}/order/api/getuserorders`,"",header,"user")
}

//GetOrdersApi
export const GetOrdersApi = async (data,header)=>{
    return await commonrequest("GET", `${BASE_URL}/order/api/orders`,"",header,"admin")
}

//OrdersUpdateStatusApi
export const OrdersUpdateStatusApi = async (data,header)=>{
    return await commonrequest("PUT", `${BASE_URL}/order/api/orders/${data.orderid}`,data,header,"admin")
}