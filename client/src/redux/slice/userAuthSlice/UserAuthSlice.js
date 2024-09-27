import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { DeleteUserApi, forgotPasswordApi, forgotPasswordVerifyApi, getAlluserApi, loginApi, registerApi, resetPasswordApi, UserContactApi, userLoggedInApi, userLoggedOutApi } from "../../../Api/userApi/UserApi";
import { AddToCartApi, DeletecartdataApi, GetUserCartApi, RemoveCartItemApi, RemoveSingleCartItemApi } from "../../../Api/cartApi/CartApi";
import { UserOrdersApi } from "../../../Api/order/OrderApi";


//Action
//thunk is a concept in redux that is known for middleware
//to perform any delayed task like fetching data or calling api we use thunk middleware
// Admin login slice

export const UserRegister = createAsyncThunk("UserRegister",async(data)=>{
    try {
        const response = await registerApi(data.data,data.config)
        
        if(response.status === 200){
            toast.success("User Registration Successfull") 
            return response.data
        }
        else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
})

//user login slice
export const UserLogin = createAsyncThunk("UserLogin",async(data)=>{
    try {
        const response = await loginApi(data)
        
        if(response.status === 200){
            toast.success("User Log in successfull.") 
            localStorage.setItem('usertoken',response.data.token)
            return response.data
        }
        else{
            
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
})


//user verify slice
export const UserVerify = createAsyncThunk("UserVerify",async(thunkApi)=>{
    try {
        const response = await userLoggedInApi()
        
        if(response.status === 200){
            // toast.success("User Log in successfull.") 
            return response.data
        }
        else{
            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }
})

//user logout slice
export const UserLogOut = createAsyncThunk("UserLogOut",async(thunkApi)=>{
    try {
        const response = await userLoggedOutApi()
        
        if(response.status === 200){
            toast.success("User Logged out successfully.") 
            localStorage.removeItem('usertoken')
            console.log('userres',response)
            return response.data
        }
        else{
            toast.success("User Logged out successfully.") 
            localStorage.removeItem('usertoken')
            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }
})

//forgot password slice
export const ForgotPass = createAsyncThunk("ForgotPass",async(data)=>{
    try {
        const response = await forgotPasswordApi(data)
        if(response.status === 200){
            toast.success("Password reset link sent to registered email.") 
            return response.data
        }
        else{
            toast.error("Invalid details.")
        }
    } catch (error) {
        throw error;
    }
})


//user token for for forgot password verify slice
export const ForgotPasswordValid = createAsyncThunk("ForgotPasswordValid",async(data)=>{
    try {
        const response = await forgotPasswordVerifyApi(data)
        
        if(response.status === 200){
            // toast.success("User Log in successfull.") 
            return response.data
        }
        else{
            toast.error("Link Expired, please try again.")
        }
    } catch (error) {
        throw error
    }
})


//password reset slice
export const ResetPass = createAsyncThunk("ResetPass",async(data)=>{
    try {
        const response = await resetPasswordApi(data)
        if(response.status === 200){
            toast.success(response.data.message)
            return response.data
        }
        else{
            toast.error("Link Expired, please try again.")
        }
    } catch (error) {
        throw error
    }
})

//AddToCart slice
export const AddToCart = createAsyncThunk("AddToCart",async(data)=>{
    try {
        const response = await AddToCartApi(data)
        if(response.status === 200){
            toast.success("Product Added to Cart.")
            return response.data
        }
        else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error
    }
})

//UserCart
export const UserCart = createAsyncThunk("UserCart",async(thunkApi)=>{
    try {
        const response = await GetUserCartApi()
        console.log('response',response)
        if(response.status === 200){
            return response.data
        }
        else{
            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }
})

//RemoveSingle
export const RemoveSingle = createAsyncThunk("RemoveSingle",async(data)=>{
    try {
        const response = await RemoveSingleCartItemApi(data)
        if(response.status === 200){
            toast.success(response.data.message)
            return response.data
        }
        else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error
    }
})

//RemoveItem
export const RemoveItem = createAsyncThunk("RemoveItem",async(data)=>{
    try {
        const response = await RemoveCartItemApi(data)
        if(response.status === 200){
            toast.success(response.data.message)
            return response.data
        }
        else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error
    }
})

//getAlluser
export const getAlluser = createAsyncThunk("getAlluser",async(data)=>{
    try {
        const response = await getAlluserApi(data)
        if(response.status === 200){
            return response.data
        }
        else{
            console.log('error')
        }
    } catch (error) {
        throw error
    }
})

//DeleteUser
export const DeleteUser = createAsyncThunk("DeleteUser",async(data)=>{
    try {
        
        const response = await DeleteUserApi(data)
        if(response.status === 200){
            toast.success("User deleted successfully")
            return response.data
        }
        else{
            toast.error('Error')
        }
    } catch (error) {
        throw error
    }
})


//Deletecartdata
export const Deletecartdata = createAsyncThunk("Deletecartdata",async(thunkApi)=>{
    try {
        
        const response = await DeletecartdataApi()
        if(response.status === 200){
            return response.data
        }
        else{
            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }
})


//UserOrders
export const Userorders = createAsyncThunk("UserOrders",async(thunkApi)=>{
    try {
        
        const response = await UserOrdersApi()
        if(response.status === 200){
            return response.data
        }
        else{
            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }
})


//UserContact
export const UserContact = createAsyncThunk("UserContact",async(data)=>{
    try {
        
        const response = await UserContactApi(data)
        if(response.status === 200){
            toast.success("Message sent successfully")
            return response.data
        }
        else{
            toast.error(response.data.error)
        }
    } catch (error) {
        throw error
    }
})


//create reducer and action
export const UserSlice = createSlice({
    name:"UserSlice",
    initialState:{
        getAllUserData:[],
        deleteuser:[],
        registeruser:[],
        loginuser:[],
        userloggedin:[],
        userloggedout:[],
        forgotpassword:[],
        forgotpasswordverifydata:[],
        resetpassworddata:[],
        addcart:[],
        usercartdata:[],
        removesinglecart:[],
        removeitemcart:[],
        deletecartdata:[],
        userordersdata:[],
        usercontactdata:[],
        loading:false,
        error:null
    },
    //extra reducer is a function which has builder which listned to changes to createAsyncThunk
    extraReducers:(builder)=>{
        //user register
        builder.addCase(UserRegister.pending,(state)=>{
            state.loading = true
        })
        .addCase(UserRegister.fulfilled,(state,action)=>{
            state.loading = false;
            state.registeruser = action.payload
        })
        .addCase(UserRegister.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


        //user login
        .addCase(UserLogin.pending,(state)=>{
            state.loading = true
        })
        .addCase(UserLogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.loginuser = action.payload
        })
        .addCase(UserLogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


        //user verify
        .addCase(UserVerify.pending,(state)=>{
            state.loading = true
        })
        .addCase(UserVerify.fulfilled,(state,action)=>{
            state.loading = false;
            state.userloggedin = [action.payload]
        })
        .addCase(UserVerify.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


        //user logout
        .addCase(UserLogOut.pending,(state)=>{
            state.loading = true
        })
        .addCase(UserLogOut.fulfilled,(state,action)=>{
            state.loading = false;
            state.userloggedout = [action.payload]
            state.userloggedin = []
            state.usercartdata = []
        })
        .addCase(UserLogOut.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //Forgot Password
        .addCase(ForgotPass.pending,(state)=>{
            state.loading = true
        })
        .addCase(ForgotPass.fulfilled,(state,action)=>{
            state.loading = false;
            state.forgotpassword = [action.payload]
        })
        .addCase(ForgotPass.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


        //ForgotPasswordValid
        .addCase(ForgotPasswordValid.pending,(state)=>{
            state.loading = true
        })
        .addCase(ForgotPasswordValid.fulfilled,(state,action)=>{
            state.loading = false;
            state.resetpassworddata = [action.payload]
        })
        .addCase(ForgotPasswordValid.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


        // ResetPassword
        .addCase(ResetPass.pending,(state)=>{
            state.loading = true
        })
        .addCase(ResetPass.fulfilled,(state,action)=>{
            state.loading = false;
            state.forgotpasswordverifydata = [action.payload]
        })
        .addCase(ResetPass.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //AddToCart
        .addCase(AddToCart.pending,(state)=>{
            state.loading = true
        })
        .addCase(AddToCart.fulfilled,(state,action)=>{
            state.loading = false;
            state.addcart = action.payload
        })
        .addCase(AddToCart.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //user cart api UserCart
        .addCase(UserCart.pending,(state)=>{
            state.loading = true
        })
        .addCase(UserCart.fulfilled,(state,action)=>{
            state.loading = false;
            state.usercartdata = action.payload
        })
        .addCase(UserCart.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //RemoveSingle
        .addCase(RemoveSingle.pending,(state)=>{
            state.loading = true
        })
        .addCase(RemoveSingle.fulfilled,(state,action)=>{
            state.loading = false;
            state.removesinglecart = action.payload
        })
        .addCase(RemoveSingle.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //RemoveItem
        .addCase(RemoveItem.pending,(state)=>{
            state.loading = true
        })
        .addCase(RemoveItem.fulfilled,(state,action)=>{
            state.loading = false;
            state.removeitemcart = action.payload
        })
        .addCase(RemoveItem.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //getAlluser
        .addCase(getAlluser.pending,(state)=>{
            state.loading = true
        })
        .addCase(getAlluser.fulfilled,(state,action)=>{
            state.loading = false;
            state.getAllUserData = action.payload
        })
        .addCase(getAlluser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //DeleteUser
        .addCase(DeleteUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(DeleteUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.deleteuser = [action.payload]
        })
        .addCase(DeleteUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //Deletecartdata
        .addCase(Deletecartdata.pending,(state)=>{
            state.loading = true
        })
        .addCase(Deletecartdata.fulfilled,(state,action)=>{
            state.loading = false;
            state.deletecartdata = [action.payload]
        })
        .addCase(Deletecartdata.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


        //UserOrders
        .addCase(Userorders.pending,(state)=>{
            state.loading = true
        })
        .addCase(Userorders.fulfilled,(state,action)=>{
            state.loading = false;
            state.userordersdata = [action.payload]
        })
        .addCase(Userorders.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        //UserContact
        .addCase(UserContact.pending,(state)=>{
            state.loading = true
        })
        .addCase(UserContact.fulfilled,(state,action)=>{
            state.loading = false;
            state.usercontactdata = action.payload
        })
        .addCase(UserContact.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})

export default UserSlice.reducer;