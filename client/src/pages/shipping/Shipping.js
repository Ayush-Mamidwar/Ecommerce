import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Country, State } from "country-state-city";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Shipping = () => {
  const location = useLocation();

  const [inputValue, setInputValue] = useState({
    mobile: "",
    city: "",
    pincode: "",
    address: "",
  });
  const [country, setCountry] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [state, setState] = useState([]);
  const [finalState, setFinalState] = useState("");
  const [spin, setSpin] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  let shippingPrice = 100;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { mobile, city, pincode, address } = inputValue;

    if (mobile === "") {
      toast.error("Please enter mobile number");
    } else if (mobile.length != 10) {
      toast.error("Please enter a valid mobile number");
    } else if (city === "") {
      toast.error("Please enter name of city");
    } else if (countryCode === "") {
      toast.error("Please select Country");
    } else if (finalState === "") {
      toast.error("Please select state");
    } else if (pincode === "") {
      toast.error("Please enter pincode");
    } else if (address === "") {
      toast.error("Please enter address.");
    } else {
      const data = {
        mobile,
        city,
        pincode,
        address,
        country: countryCode,
        state: finalState,
        itemsPrice: location.state,
        shippingPrce: shippingPrice,
        totalPrice: location.state + shippingPrice,
      };

      navigate("/checkout", { state: data });
    }
  };

  useEffect(() => {
    let countrydata = Country.getAllCountries();
    let arr = [];
    for (let i = 0; i < countrydata?.length; i++) {
      let storeddata = {
        value: countrydata[i]?.isoCode,
        label: countrydata[i]?.name,
      };
      arr.push(storeddata);
    }
    setCountry(arr);

    if (countryCode) {
      let stateData = State.getStatesOfCountry(countryCode);

      let arr2 = [];
      for (let i = 0; i < stateData?.length; i++) {
        let storestatedata = {
          value: stateData[i].isoCode,
          label: stateData[i].name,
        };
        arr2.push(storestatedata);
      }
      setState(arr2);
    }
  }, [countryCode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    }, 400);
  }, []);

  return (
    <>
      {spin ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center min-h-[80vh] mt-4">
          <div className="w-[60%] p-8 bg-white rounded-lg shadow-xl">
            <h1 className="text-3xl font-semibold text-center mb-8">
              Shipping Details
            </h1>

            <form className="space-y-4">
              <input
                type="text"
                name="mobile"
                className="inpt"
                placeholder="Enter mobile number"
                value={inputValue.mobile}
                onChange={handleChange}
                required
              />

              <Select
                options={country}
                onChange={(e) => {
                  setCountryCode(e.value);
                }}
                placeholder="select country"
              />

              <Select
                options={state}
                onChange={(e) => {
                  setFinalState(e.label);
                }}
                placeholder={"select state"}
              />

              <input
                type="text"
                name="city"
                className="inpt"
                placeholder="Enter your city"
                onChange={handleChange}
                value={inputValue.city}
                required
              />

              <input
                type="text"
                name="pincode"
                className="inpt"
                placeholder="Enter your pincode"
                onChange={handleChange}
                value={inputValue.pincode}
                required
              />

              <textarea
                name="address"
                className="inpt"
                placeholder="Shipping Address"
                rows={5}
                onChange={handleChange}
                value={inputValue.address}
              />
              <button
                type="submit"
                className="block w-full px-4 py-2 mt-4 text-lg bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-600"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Shipping;
