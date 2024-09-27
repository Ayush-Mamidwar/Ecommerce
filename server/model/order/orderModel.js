const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userid:{
        type:Object,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    orderItems:[],
    paymentdetails:{
        paymentid:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    },
    paid:{
        type:Date,
        default:Date.now
    },
    itemsPrice:{ //all items total price
        type:Number,
        required:true,
        default:0
    },
    shippingPrce:{ 
        type:Number,
        required:true,
        default:0
    },
    totalPrice:{ 
        type:Number,
        required:true, 
        default:0
    },
    orderStatus:{ 
        type:String,
        required:true,
        default:"Processing"
    },
    deliveredAt:Date
},{timestamps:true})


const orderDb = new mongoose.model("orders",orderSchema)
module.exports = orderDb