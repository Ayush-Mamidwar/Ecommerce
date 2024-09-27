const mongoose = require('mongoose')
require('dotenv').config()

const DB = process.env.MONGO_URL

// mongoose.connect(DB,{
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// })
mongoose.connect(DB)
.then(()=>{console.log('db connected successfully')})
.catch((err)=>console.log('mongo connection error: ',err))