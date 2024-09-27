import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { ProcessPaymentApi } from "../../../Api/paymentApi/PaymentApi";
import { AddOrderApi } from "../../../Api/order/OrderApi";

//payment slice
export const PaymentProcess = createAsyncThunk("PaymentProcess",async(data)=>{
    try {
        const response = await ProcessPaymentApi(data)
        
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

//Order
export const Order = createAsyncThunk("Order",async(data)=>{
    try {
        const response = await AddOrderApi(data)
        
        if(response.status === 200){
            toast.success("Payment Completed.")
            return response.data
        }
        else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
})


export const PaymentSlice = createSlice({
    name:"PaymentSlice",
    initialState:{
        payment:[],
        ordersuccess:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(PaymentProcess.pending,(state)=>{
            state.loading = true;
        })
        .addCase(PaymentProcess.fulfilled, (state,action)=>{
            state.loading = true;
            state.payment = action.payload
        })
        .addCase(PaymentProcess.rejected, (state,action)=>{
            state.loading = true;
            state.error = action.payload
        })

        //ordersuccess
        .addCase(Order.pending,(state)=>{
            state.loading = true;
        })
        .addCase(Order.fulfilled, (state,action)=>{
            state.loading = true;
            state.ordersuccess = action.payload
        })
        .addCase(Order.rejected, (state,action)=>{
            state.loading = true;
            state.error = action.payload
        })

    }
})

export default PaymentSlice.reducer