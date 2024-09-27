import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminLoggedInApi, AdminLoginApi, AdminLogoutApi } from "../../../Api/adminApi/AdminApi";
import toast from "react-hot-toast";
import { GetOrdersApi, OrdersUpdateStatusApi } from "../../../Api/order/OrderApi";


//Action
//thunk is a concept in redux that is known for middleware
//to perform any delayed task like fetching data or calling api we use thunk middleware
// Admin login slice

export const AdminAuthLogin = createAsyncThunk("AdminLogin",async(data)=>{
    try {
        const response = await AdminLoginApi(data)
        
        if(response.status === 200){
            toast.success("Admin Login Successful")
            localStorage.setItem("admintoken",response.data.token)
            return response.data
        }
        else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
})

//Admin LoggedIn Slice
export const AdminLoggedIn = createAsyncThunk("AdminLoggedIn",async(thunkApi)=>{
    try {
        const response = await AdminLoggedInApi()
        if(response.status === 200){
            return response.data
        }else{
            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }
})


//Admin Logout Slice
export const AdminLogout = createAsyncThunk("AdminLogout",async(thunkApi)=>{
    try {
        const response = await AdminLogoutApi()
        if(response.status === 200){
            toast.success("Successfully Logged out")
            localStorage.removeItem('admintoken')
            return response.data
        }else{
            localStorage.removeItem('admintoken')
            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }
})


//OrdersForAdmin
export const OrdersForAdmin = createAsyncThunk("OrdersForAdmin",async(thunkApi)=>{
    try {
        const response = await GetOrdersApi()
        if(response.status === 200){
            return response.data
        }else{
            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }
})

//OrderUpdateStatus
export const OrderUpdateStatus = createAsyncThunk("OrderUpdateStatus",async(data)=>{
    try {
        const response = await OrdersUpdateStatusApi(data)
        if(response.status === 200){
            toast.success("Order status updated.")
            return response.data
        }else{
           toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error
    }
})


//create reducer and action
export const AdminSlice = createSlice({
    name:"AdminSlice",
    initialState:{
        adminlogin:[],
        adminLoggedInData:[],
        adminLogoutData:[],
        ordersdata:[],
        orderstatuschange:[],
        loading:false,
        error:null
    },
    //extra reducer is a function which has builder which listned to changes to createAsyncThunk
    extraReducers:(builder)=>{
        //Admin Login
        builder.addCase(AdminAuthLogin.pending,(state)=>{
            state.loading = true
        })
        .addCase(AdminAuthLogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.adminlogin = action.payload
        })
        .addCase(AdminAuthLogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //Admin Verify
        .addCase(AdminLoggedIn.pending,(state)=>{
            state.loading = true
        })
        .addCase(AdminLoggedIn.fulfilled,(state,action)=>{
            state.loading = false;
            state.adminLoggedInData = [action.payload]
        })
        .addCase(AdminLoggedIn.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //Admin logout
        .addCase(AdminLogout.pending,(state)=>{
            state.loading = true
        })
        .addCase(AdminLogout.fulfilled,(state,action)=>{
            state.loading = false;
            state.adminLogoutData = [action.payload]
        })
        .addCase(AdminLogout.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //OrdersForAdmin
        .addCase(OrdersForAdmin.pending,(state)=>{
            state.loading = true
        })
        .addCase(OrdersForAdmin.fulfilled,(state,action)=>{
            state.loading = false;
            state.ordersdata = action.payload
        })
        .addCase(OrdersForAdmin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //OrderUpdateStatus
        .addCase(OrderUpdateStatus.pending,(state)=>{
            state.loading = true
        })
        .addCase(OrderUpdateStatus.fulfilled,(state,action)=>{
            state.loading = false;
            state.orderstatuschange = [action.payload]
        })
        .addCase(OrderUpdateStatus.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default AdminSlice.reducer;