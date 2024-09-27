const orderDb = require('../../model/order/orderModel')
const moment = require('moment')
const userdb = require('../../model/user/userModel')
const { transporter,orderConfirmationTemplate } = require('../../helper')

//admin
const AddOrders = async(req,res)=>{
    const {mobile,city,pincode,address,country,orderItems,paymentdetails,
    itemsPrice,shippingPrce,state,totalPrice} = req.body
    
    const deliveryDate = moment().add(2,'days').format('YYYY-MM-DD')
    try {
        const createOrder = new orderDb({
            userid:req.
            userId,mobile,city,pincode,address,country,orderItems,paymentdetails,state,
            itemsPrice,shippingPrce,totalPrice,
            deliveredAt:deliveryDate
        })
        await createOrder.save()
        
        res.status(200).json(createOrder)
    } catch (error) {
        res.status(200).json(error)
    }
}

//user
const GetUserOrders = async(req,res)=>{
    try {
        const getUserOrders = await orderDb.find({userid:req.userId}).sort({_id:-1})

        res.status(200).json(getUserOrders)
    } catch (error) {
        res.status(200).json(error)
    }
}

//admin
const GetAllOrders = async(req,res)=>{
    try {
        const getAllOrders = await orderDb.find().sort({_id:-1})
        res.status(200).json(getAllOrders)
    } catch (error) {
        res.status(200).json(error)
    }
}

//admin
const UpdateOrderStatus = async(req,res)=>{
    const {orderid} = req.params
    const {orderStatus} = req.body
    try {
        const findOrderDetails = await orderDb.findOne({_id:orderid})
       
        const userdetails = await userdb.findOne({_id:findOrderDetails.userid})

        if(findOrderDetails.orderStatus == "Processing" && orderStatus == "Confirmed"){
            const updateOrder = await orderDb.findByIdAndUpdate({_id:orderid},{orderStatus:orderStatus},{new:true})
            await updateOrder.save()
            //send invoice
            const mailOptions = {
                from:"ayushmamidwar95@gmail.com",
                to:userdetails.email,
                subject:"Sending Email For Order Confirmation",
                html:orderConfirmationTemplate(findOrderDetails,userdetails)
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    // console.error('Error sending email:', error); 
                    res.status(400).json({ error: "Email Not Sent", details: error.message });
                } else {
                    // console.log("Email sent:", info.response);
                    res.status(200).json({ message: "Email Sent Successfully" });
                }
            });
            
            res.status(200).json(updateOrder)
        }
        else if(findOrderDetails.orderStatus == "Confirmed" && orderStatus == "Shipped"){
            const updateOrder = await orderDb.findByIdAndUpdate({_id:orderid},{orderStatus:orderStatus},{new:true})

            await updateOrder.save()

            res.status(200).json(updateOrder)
        }
        else if(findOrderDetails.orderStatus == "Shipped" && orderStatus == "Delivered"){
            const updateOrder = await orderDb.findByIdAndUpdate({_id:orderid},{orderStatus:orderStatus},{new:true})

            await updateOrder.save()

            res.status(200).json(updateOrder)
        }
        else{
            
            res.status(400).json({error:"invalid status"})
        }
    } catch (error) {
        res.status(200).json(error)
    }

}

module.exports = {AddOrders,GetUserOrders,GetAllOrders,UpdateOrderStatus}