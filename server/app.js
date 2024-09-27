//env configuration
require('dotenv').config()

const express = require('express')
//creating express server
const app = express()
require('./db/conn')

const cors = require('cors')
const port = 4009;

//middleware
app.use(cors())
app.use(express.json())


//admin routes
const adminAuthRoutes = require('./routes/admin/adminAuthRoutes')
app.use('/adminauth/api',adminAuthRoutes)


//products routes
const producRoutes = require('./routes/products/productRoutes')
app.use('/product/api',producRoutes)

//user routes
const userAuthRoutes = require('./routes/user/userAuthRoutes')
app.use('/userauth/api',userAuthRoutes)

//payment routes
const paymentRoutes = require('./routes/payments/PaymentRoutes')
 app.use("/checkout/api",paymentRoutes)

//order routes
const orderRoutes = require('./routes/order/orderRoutes')
app.use('/order/api/',orderRoutes)

//carts routes
const cartsRoutes = require('./routes/carts/cartsRoutes')
app.use('/carts/api',cartsRoutes)


//start server
app.listen(port,()=>{console.log(`server started on port ${port}`)})