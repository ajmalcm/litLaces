"use client";

import SummaryProduct from "@/components/SummaryProduct";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State, City } from "country-state-city";
import {
  useOrderPaymentMutation,
  usePlaceOrderMutation,
} from "@/redux/services/userReducers";
import Script from "next/script";
import { toast } from "sonner";

export default function Checkout() {
  const { cart } = useSelector((state: any) => state.auth);
  const allStates = State.getStatesOfCountry("IN");
  const [allCities, setAllCities] = useState([{ name: "", isoCode: "" }]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingCost] = useState<number>(200);
  const [paymentInfo, setPaymentInfo] = useState({ id: "", status: "" });
  const [processing, setProcessing] = useState<boolean>(false);

  const [orderPaymentMutation] = useOrderPaymentMutation();
  const [placeOrderMutation] = usePlaceOrderMutation();

  const [shippingDetails, setShippingDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phoneNo: "",
  });

  // Calculate total price
  useEffect(() => {
    if (cart?.length > 0) {
      const total = cart.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  // Update cities when state changes
  useEffect(() => {
    const selectedState = allStates.find(
      (s) => s.isoCode === shippingDetails.state
    );
    if (selectedState) {
      const cities = City.getCitiesOfState("IN", selectedState.isoCode);
      setAllCities(cities as any);
    }
  }, [shippingDetails.state]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const initiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setProcessing(true);

      // Step 1: Create Razorpay order from backend
      const { data: orderData } = await orderPaymentMutation({
        amount: totalPrice + shippingCost,
      });

      if (!orderData?.id) {
        toast.error("Failed to initiate payment.");
        setProcessing(false);
        return;
      }

      // Step 2: Configure Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: orderData.amount, // backend amount (in paise)
        currency: "INR",
        name: "LIT LACES",
        description: "Order Payment",
        order_id: orderData.id,
        handler: async (response: any) => {
          if (
            orderData.id === response?.razorpay_order_id &&
            response?.razorpay_payment_id
          ) {
            setPaymentInfo({
              id: response.razorpay_payment_id,
              status: "success",
            });

            // Step 3: Place order after successful payment
            const orderItems = cart.map((item: any) => ({
              product: item.product,
              quantity: item.quantity,
              price: item.price,
              name: item.name,
              image: item.image.url,
              size: item.size,
            }));

            const orderPayload = {
              orderItems,
              shippingInfo: shippingDetails,
              paymentInfo: {
                id: response.razorpay_payment_id,
                status: "success",
              },
              isPaid: true,
              itemsPrice: totalPrice,
              shippingPrice: shippingCost,
              totalAmount: totalPrice + shippingCost,
            };

            const res = await placeOrderMutation(orderPayload).unwrap();
            toast.success(res?.message || "Order placed successfully!");
          } else {
            toast.error("Payment verification failed.");
          }
          setProcessing(false);
        },
        prefill: {
          name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
          email: shippingDetails.email,
          contact: shippingDetails.phoneNo,
        },
        theme: { color: "#0a0a0a", hide_topbar: true },
        method: { upi: true, card: true, netbanking: true }, // Restrict payment options
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong.");
      setProcessing(false);
    }
  };

  return (
    <form
      className="min-h-screen bg-black text-white"
      onSubmit={initiatePayment}
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="max-w-5xl mx-auto p-6 lg:flex lg:gap-12">
        {/* Left Section */}
        <div className="flex-1 bg-[#0a0a0a] p-6 rounded-xl border border-gray-900">
          <h1 className="text-3xl font-extrabold mb-6">Checkout</h1>

          {/* Contact Info */}
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <input
            type="email"
            name="email"
            value={shippingDetails.email}
            onChange={onChangeHandler}
            required
            className="w-full p-4 mb-6 rounded-lg bg-gray-800 border border-gray-700"
            placeholder="Email"
          />

          {/* Delivery Address */}
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="firstName"
              value={shippingDetails.firstName}
              onChange={onChangeHandler}
              placeholder="First Name"
              required
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              value={shippingDetails.lastName}
              onChange={onChangeHandler}
              placeholder="Last Name"
              required
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg"
            />
          </div>

          <input
            type="text"
            name="address"
            value={shippingDetails.address}
            onChange={onChangeHandler}
            placeholder="Address"
            required
            className="w-full mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <select
              name="state"
              value={shippingDetails.state}
              onChange={onChangeHandler}
              required
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <option value="">Select State</option>
              {allStates.map((st) => (
                <option key={st.isoCode} value={st.isoCode}>
                  {st.name}
                </option>
              ))}
            </select>
            <select
              name="city"
              value={shippingDetails.city}
              onChange={onChangeHandler}
              required
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <option value="">Select City</option>
              {allCities.map((ct) => (
                <option key={ct.name} value={ct.name}>
                  {ct.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="pinCode"
              value={shippingDetails.pinCode}
              onChange={onChangeHandler}
              placeholder="ZIP Code"
              required
              className="p-4 bg-gray-800 border border-gray-700 rounded-lg"
            />
          </div>

          <input
            type="tel"
            name="phoneNo"
            value={shippingDetails.phoneNo}
            onChange={onChangeHandler}
            placeholder="Phone Number"
            pattern="[0-9]{10}"
            required
            className="w-full mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg"
          />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 bg-[#0a0a0a] p-6 mt-8 lg:mt-0 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          {cart.map((product: any, idx: number) => (
            <SummaryProduct key={idx} {...product} />
          ))}
          <hr className="border-gray-700 my-6" />
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>₹{totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>₹{shippingCost}</p>
          </div>
          <div className="flex justify-between font-semibold mt-4">
            <p>Total</p>
            <p>₹{totalPrice + shippingCost}</p>
          </div>
          <button
            type="submit"
            disabled={processing}
            className="mt-8 w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            {processing ? "Processing..." : "Complete Payment"}
          </button>
        </div>
      </div>
    </form>
  );
}
