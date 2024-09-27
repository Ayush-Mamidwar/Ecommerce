const cartsDB = require("../../model/carts/cartsModel");
const productsdb = require("../../model/product/productModel");

const AddToCart = async (req, res) => {
  const { id } = req.params;

  try {
    const productfind = await productsdb.findOne({ _id: id });
    const carts = await cartsDB.findOne({
      userid: req.userId,
      productid: productfind._id,
    });

    if (productfind?.quantity >= 1) {
      if (carts?.quantity >= 1) {
        //item present in cart
        //increase quantity of product
        carts.quantity = carts.quantity + 1;
        await carts.save();

        //reduce quantity from products
        productfind.quantity = productfind.quantity - 1;
        await productfind.save();

        res.status(200).json({ message: "Product Quantity Incremented" });
      } else {
        //item not present in cart

        //add product to cart
        const addtocart = new cartsDB({
          userid: req.userId,
          productid: productfind._id,
          quantity: 1,
        });
        await addtocart.save();

        //reduce quantity from products
        productfind.quantity = productfind.quantity - 1;
        await productfind.save();

        res.status(200).json({ message: "Product Successfully Added to Cart" });
      }
    } else {
      res.status(400).json({ error: "Product Sold Out" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const GetCartsValue = async (req, res) => {
  try {
    const getCarts = await cartsDB.aggregate([
      {
        $match: { userid: req.userMainId }, //to fetch all the data of current user
      },
      {
        $lookup: {
          from: "productmodels", //from which model data is to be fetched
          localField: "productid", //name of field to be searched in current model
          foreignField: "_id", //to which field to match in productmodel
          as: "productDetails",
        },
      },
      //getting first data from product details
      {
        $project: {
          _id: 1,
          userid: 1,
          productid: 1,
          quantity: 1,
          productDetails: { $arrayElemAt: ["$productDetails", 0] }, //extract first element of product array
        },
      },
    ]);
    res.status(200).json(getCarts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const RemoveSingleItem = async (req, res) => {
  const { id } = req.params;
  try {
    const productfind = await productsdb.findOne({ _id: id });
    const carts = await cartsDB.findOne({
      userid: req.userId,
      productid: productfind._id,
    });

    if (!carts) {
      res.status(400).json({ error: "Cart Item Not Found" });
    }

    if (carts?.quantity == 1) {
      //remove item from cart
      const deleteCartItem = await cartsDB.findByIdAndDelete({
        _id: carts._id,
      });

      //increase qunantity of item in all products
      productfind.quantity = productfind.quantity + 1;
      await productfind.save();

      res
        .status(200)
        .json({ message: "Item Successfully Removed", deleteCartItem });
    } else if (carts?.quantity > 1) {
      //decrease quantity of product
      carts.quantity = carts.quantity - 1;
      await carts.save();

      //increase qunantity of item in all products
      productfind.quantity = productfind.quantity + 1;
      await productfind.save();

      res.status(200).json({ message: "Item Quantity Decremented" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const RemoveAllItems = async (req, res) => {
  const { id } = req.params;
  try {
    const productfind = await productsdb.findOne({ _id: id });
    const carts = await cartsDB.findOne({
      userid: req.userId,
      productid: productfind._id,
    });

    if (!carts) {
      res.status(400).json({ error: "Cart item not found" });
    } else {
      const deleteCartItem = await cartsDB.findByIdAndDelete({
        _id: carts._id,
      });

      //increment item quantity in all products
      productfind.quantity = productfind.quantity + carts.quantity;
      await productfind.save();

      res
        .status(200)
        .json({ message: "Item removed from cart.", deleteCartItem });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const DeleteCartsData = async (req, res) => {
  try {
    const deleteCartItems = await cartsDB.deleteMany({ userid: req.userId });
    res.status(200).json(deleteCartItems);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  AddToCart,
  GetCartsValue,
  RemoveSingleItem,
  RemoveAllItems,
  DeleteCartsData,
};
