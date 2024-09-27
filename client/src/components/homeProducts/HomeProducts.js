import React from "react";
import { NavLink } from "react-router-dom";

const HomeProducts = ({ productsData,latestproducts }) => {
  return (
    <>
      <div className=" my-8 px-4">
        <h3 className="text-4xl font-extrabold mb-4">Featured Products</h3>

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
          {productsData?.length > 0
            ? productsData.slice(0, 4).map((element, index) => {
                return(
                <div className="">
                  <div className="hover:underline">
                    <img
                      src={element.productimage}
                      className="rounded-3xl shadow-xl max-h-80"
                    />
                    <h4 className="mt-2 tracking-widest font-bold">
                      {element.productname}
                    </h4>
                  </div>
                  <div className="price">
                    ₹ {element.price}.00
                    <button className="mx-2 bg-[#1b1b1b] text-white p-2 text-xs rounded-lg">
                      <NavLink
                        to={`/productsdetails/${element._id}`}
                      > 
                        
                        Buy Now
                       </NavLink>
                    </button>
                  </div>
                </div>
                )})
            : "Sold Out"}
        </div>
      </div>

      <div className=" my-8 px-4">
        <h3 className="text-4xl font-extrabold mb-4">New Arrivals</h3>

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
        {/* {console.log('ele',latestproducts[0])} */}
          {latestproducts?.length > 0
            ? latestproducts[0].slice(0, 4).map((element, index) => {
                return(
                <div className="">
                  <div className="hover:underline">
                    <img
                      src={element.productimage}
                      className="rounded-3xl shadow-xl max-h-80"
                    />
                    <h4 className="mt-2 tracking-widest font-bold">
                      {element.productname}
                    </h4>
                  </div>
                  <div className="price">
                    ₹ {element.price}.00
                    <button className="mx-2 bg-[#1b1b1b] text-white p-2 text-xs rounded-lg">
                      <NavLink
                        to={`/productsdetails/${element._id}`}
                      > 
                        
                        Buy Now
                       </NavLink>
                    </button>
                  </div>
                </div>
                )})
            : "Sold Out"}
        </div>
      </div>
    </>
  );
};

export default HomeProducts;
