const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const ProcessPayment = async(req,res)=>{
    const {totalamount} = req.body

    try{
        const myPayment = await stripe.paymentIntents.create({
            amount:totalamount,
            currency:"inr",
            metadata:{
                company:"Urban Vibe"
            }
        })

        res.status(200).json(myPayment.client_secret);
    }catch(error){
        res.status(400).json(error)
    }
}

module.exports = {ProcessPayment}