"use client";

import SummaryProduct from "@/components/SummaryProduct";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State, City } from "country-state-city";
import { useOrderPaymentMutation } from "@/redux/services/userReducers";
import Script from "next/script";

export default function Checkout() {
  const { cart } = useSelector((state: any) => state.auth);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const allStates = State.getStatesOfCountry("IN");
  const [allCities, setAllCities] = useState([{ name: "", isoCode: "" }]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
      setShippingCost(200); // Example static shipping cost
    } else {
      setTotalPrice(0);
      setShippingCost(0);
    }
  }, [cart]);

  const [orderDetails, setDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phoneNo: "",
  });

  const [processing, setProcessing] = useState<boolean>(false);
  const [orderPaymentMutation] = useOrderPaymentMutation();

  const { email, firstName, lastName, address, city, state, pinCode, phoneNo } =
    orderDetails;

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const { data } = await orderPaymentMutation({
        amount: totalPrice + shippingCost,
      });



      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: (totalPrice+shippingCost )* 100, // Amount in paise
        currency: "INR",
        name: "LIT LACES",
        description: "Order Payment",
        order_id: data?.id,
        handler: (response: any) => {
          console.log("Payment successful:", response);
          // Handle successful payment here
          setProcessing(false);
          // Optionally, redirect or show success message
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email: email,
          contact: phoneNo,
        },
        theme: {
          color: "#0a0a0a",
          hide_topbar: true,
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed:", error);
      setProcessing(false);
      // Handle error (e.g., show error message)
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const selectedState = allStates.find(
      (state) => state.isoCode === orderDetails.state
    );
    if (selectedState) {
      const cities = City.getCitiesOfState("IN", selectedState.isoCode);
      setAllCities(cities as any);
    }
  }, [state]);

  return (
    <form className="min-h-screen bg-black text-white" onSubmit={onSubmitHandler}>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => console.log("Razorpay script loaded")}
      />
      <div className="max-w-5xl mx-auto p-6 lg:flex lg:gap-12">
        {/* Left Section: Contact & Delivery */}
        <div className="flex-1 bg-[#0a0a0a] p-6 rounded-xl shadow-xl border border-gray-900">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-100">
            Checkout
          </h1>

          {/* Contact Section */}
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Contact Information
          </h2>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChangeHandler}
              required
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="Email"
            />
            {/* <div className="mt-3 flex items-center">
              <input
                type="checkbox"
                id="offers"
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 rounded"
              />
              <label htmlFor="offers" className="ml-2 text-sm text-gray-400">
                Send me news and exclusive offers
              </label>
            </div> */}
          </div>

          {/* Delivery Section */}
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Delivery Address (INDIA)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              id="first-name"
              required
              name="firstName"
              value={firstName}
              onChange={onChangeHandler}
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="First Name"
            />
            <input
              type="text"
              id="last-name"
              name="lastName"
              value={lastName}
              onChange={onChangeHandler}
              required
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="Last Name"
            />
          </div>
          <div className="mt-6">
            <input
              type="text"
              required
              minLength={10}
              name="address"
              value={address}
              onChange={onChangeHandler}
              id="address"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="Address"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <select
              id="state"
              name="state"
              value={state}
              onChange={onChangeHandler}
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none text-sm"
            >
              <option value="">Select State</option>
              {allStates.map((state) => (
                <option
                  key={state.isoCode}
                  value={state.isoCode}
                  defaultValue={""}
                >
                  {state.name}
                </option>
              ))}
            </select>
            <select
              id="city"
              name="city"
              value={city}
              onChange={onChangeHandler}
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none text-sm"
            >
              <option value="">Select City</option>
              {allCities.map((city) => (
                <option key={city.isoCode} value={city.name} defaultValue={""}>
                  {city.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              id="zip"
              required
              name="pinCode"
              value={pinCode}
              onChange={onChangeHandler}
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="ZIP Code"
            />
          </div>
          <div className="mt-6">
            <input
              required
              type="tel"
              id="phone"
              name="phoneNo"
              value={phoneNo}
              onChange={onChangeHandler}
              pattern="[0-9]{10}"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-gray-500 focus:outline-none placeholder-gray-400 text-sm"
              placeholder="Phone Number"
            />
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="w-full lg:w-1/3 bg-[#0a0a0a] p-6 mt-8 lg:mt-0 rounded-xl shadow-xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">
            Order Summary
          </h2>

          {/* Product Info */}
          {cart.map((product: any, index: number) => (
            <SummaryProduct
              key={index}
              image={product.image}
              name={product.name}
              price={product.price}
              size={product.size}
              quantity={product.quantity}
              productId={product?.product}
            />
          ))}

          <hr className="border-gray-700 mb-6" />

          {/* Price Details */}
          <div className="flex justify-between mb-4 text-gray-300 text-sm">
            <p>Subtotal</p>
            <p>₹{totalPrice}</p>
          </div>
          <div className="flex justify-between mb-4 text-gray-300 text-sm">
            <p>Shipping</p>
            <p className="text-gray-500">{shippingCost}</p>
          </div>
          <hr className="border-gray-700 mb-6" />
          <div className="flex justify-between text-lg font-semibold text-gray-100">
            <p>Total</p>
            <p>₹{totalPrice + shippingCost}</p>
          </div>

          {/* Checkout Button */}
          <button
            className="mt-8 w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium shadow-lg focus:outline-none transition-transform duration-300 hover:scale-105"
            type="submit"
            disabled={processing}
            >
            {processing ? "Processing..." : "Complete Payment"}
          </button>
        </div>
      </div>
    </form>
  );
}
