const express = require('express')
const userAuthenticate = require('../../middleware/user/userAuthenticate')
const { AddOrders,GetUserOrders,GetAllOrders,UpdateOrderStatus } = require('../../controllers/order/orderControllers')
const adminAuthenticate = require('../../middleware/admin/adminAuthenticate')
const router = express.Router()


//for user module
router.post("/addorders",userAuthenticate,AddOrders)

router.get("/getuserorders",userAuthenticate,GetUserOrders)



//for admin
router.get('/orders',adminAuthenticate,GetAllOrders)
router.put("/orders/:orderid",adminAuthenticate,UpdateOrderStatus)

module.exports = router