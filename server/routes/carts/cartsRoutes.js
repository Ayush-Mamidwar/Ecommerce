const express = require('express')
const router = express.Router()

const {AddToCart,GetCartsValue,
    RemoveSingleItem,RemoveAllItems,DeleteCartsData} = require('../../controllers/carts/cartsControllers')
const userAuthenticate = require('../../middleware/user/userAuthenticate')

//add to cart
router.post('/addtocart/:id',userAuthenticate,AddToCart)

router.get('/getcarts',userAuthenticate,GetCartsValue)
router.delete('/removesingleitem/:id',userAuthenticate,RemoveSingleItem)
router.delete('/removeitems/:id',userAuthenticate,RemoveAllItems)


//delete cart data when order placed
router.delete('/removecartdata',userAuthenticate,DeleteCartsData)


module.exports = router