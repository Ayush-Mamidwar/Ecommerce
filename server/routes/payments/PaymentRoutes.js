const express = require('express')
const router = express.Router()
const userAuthenticate = require('../../middleware/user/userAuthenticate')
const {ProcessPayment} = require('../../controllers/payments/paymentControllers')

router.post("/payment",userAuthenticate,ProcessPayment)

module.exports = router