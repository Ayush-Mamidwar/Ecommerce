import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ReviewModal from "../../components/Modal/ReviewModal";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetSingleProducts,
  ProductReview,
  ReviewDelete,
} from "../../redux/slice/productSlice/ProductSlice";
import toast from "react-hot-toast";
import { AddToCart } from "../../redux/slice/userAuthSlice/UserAuthSlice";

const ProductsDetialsMain = () => {
  const { singleproduct } = useSelector((state) => state.Product);
  const { userloggedin } = useSelector((state) => state.User);
  const { addproductreview } = useSelector((state) => state.Product);
  const { productreview } = useSelector((state) => state.Product);
  const {deletereview} = useSelector((state) => state.Product);
  const { usercartdata } = useSelector((state) => state.User);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [description, setDiscription] = useState("");
  const [rating, setRating] = useState("");
  const [showRating, setShowRating] = useState("");

  const getProductsDetails = () => {
    const data = {
      productid: id,
    };

    dispatch(GetSingleProducts(data));
  };

  //check if user is valid for review
  const handleOpenModel = () => {
    if (userloggedin.length == 0) {
      toast.error("Please Login to write a Review");
      navigate("/login");
    } else {
      setShowModal(!showModal);
    }
  };

  const getProductReviewDetails = () => {
    const data = {
      productid: singleproduct[0]?._id,
    };
    dispatch(ProductReview(data));
  };

  //product review delete
  const handleReviewDelete = (id)=>{
    const data = {
        reviewid: id
    }
    console.log(data)
    dispatch(ReviewDelete(data))
  }

  //add to cart
  const handleIncrement =(e)=>{
    dispatch(AddToCart(e))
  }

  useEffect(() => {
    getProductsDetails();
  }, [id, addproductreview,usercartdata]);

  useEffect(() => {
    let totalRating = 0;
    productreview.map((ele) => {
      totalRating += parseInt(ele.rating);
    });
    setShowRating(Math.round(totalRating / productreview.length));
  }, [productreview]);

  useEffect(() => {
    getProductReviewDetails();
  }, [singleproduct,deletereview]);
  return (
    <>
      <div className="lg:flex p-2">
        <img
          src={singleproduct[0]?.productimage}
          className="w-[50%] max-h-[85vh] p-8 rounded-2xl shadow-xl"
        />

        <div className="w-full p-8 flex flex-col gap-6 ">
          <div className="mb-6">
            <h1 className="tracking-wider font-extrabold text-5xl ">
              {singleproduct[0]?.productname}
            </h1>
            <p className="text-xl mt-4 font-normal tracking-widest">
              ₹ {singleproduct[0]?.price}.00
            </p>

            <p className="text-blue-600">
              Discount:{" "}
              <span className="font-semibold text-black">
                {singleproduct[0]?.discount}%
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            Rating:
            <ul className="flex gap-1">
              {showRating ? (
                <>
                    {Array.from({ length: showRating }).map(
                          (ele, ind) => {
                            return (
                              <>
                                <li className="text-yellow-500">
                                  <FaStar />
                                </li>
                              </>
                            );
                          }
                        )}
                </>

              ) : (
                "No Ratings"
              )}
            </ul>
            <span className="font-light">{`(`}{productreview?.length} Ratings {`)`}</span>
          </div>

          <div className="mt-8 flex flex-col gap-4 ">
            <p className="font-light">
              Items Left:{" "}
              <span className="text-red-500 font-normal">
                {singleproduct[0]?.quantity}
              </span>
            </p>
            <p className="text-lg text-blue-600">
              FREE DELIVERY:
              <span className="text-black"> NOV-10-15</span> Details
            </p>
            <p>
              Fastest delivery: <span className="font-bold">Tomorrow 11AM</span>{" "}
            </p>
          </div>

          <p className="text-md font-light">
            <span className="font-bold">Description: </span>
            {singleproduct[0]?.description}
          </p>

          <div className="addtocart">
            <button
              className="bg-[#1b1b1b] text-white p-2 
                    rounded-2xl hover:bg-gray-700"
             onClick={()=>handleIncrement(singleproduct[0]?._id)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* reviews */}
      <div className="p-6 mt-8">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl">Customer Reviews: </h3>

          <button
            onClick={() => {
              handleOpenModel();
            }}
            className="bg-blue-600 text-white p-2 rounded-2xl hover:bg-blue-900"
          >
            Add Review
          </button>
        </div>

        <div className="mt-2 mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productreview.length > 0
            ? productreview.map((element) => {
                return (
                  <>
                    <div className="border border-gray-400 p-4 rounded-lg bg-white hover:shadow-2xl">
                      <h1 className="text-xl font-semibold mb-2">
                        {element.username}
                      </h1>
                      <ul className="flex gap-1 mb-4">
                        {Array.from({ length: element.rating }).map(
                          (ele, ind) => {
                            return (
                              <>
                                <li className="text-yellow-500">
                                  <FaStar />
                                </li>
                              </>
                            );
                          }
                        )}
                      </ul>
                      <hr />
                      <p className="text-sm mt-4">{element.description}</p>
                      {userloggedin[0]?._id === element.userid && (
                        <MdDelete onClick={()=>{handleReviewDelete(element._id)}} className="text-red-500 text-2xl mt-2 cursor-pointer" />
                      )}
                    </div>
                  </>
                );
              })
            : "Be the first one to write a review"}
        </div>

        {showModal && (
          <ReviewModal
            setShowModal={setShowModal}
            userloggedin={userloggedin}
            rating={rating}
            description={description}
            setDiscription={setDiscription}
            setRating={setRating}
            singleproduct={singleproduct}
          />
        )}
      </div>
    </>
  );
};

export default ProductsDetialsMain;
