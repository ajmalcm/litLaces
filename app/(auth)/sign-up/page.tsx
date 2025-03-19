
'use client'
import React, { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [avatar, setAvatar] = useState(null);
  const [signUpDetails,setSighnUpDetails]=useState({name:"",email:"",password:"",confirmpassword:""})

  const handleAvatarChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader() as any;
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSighnUpDetails({ ...signUpDetails, [name]: value });
  }

  const { name, email, password, confirmpassword } = signUpDetails;

  return (
    <div className="min-h-[70vh] bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-gray-600 focus:outline-none"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={handleChange}
              
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-gray-600 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-gray-600 focus:outline-none"
              placeholder="Create a password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-400"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmpassword"
              value={confirmpassword}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-gray-600 focus:outline-none"
              placeholder="Re-enter your password"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-400"
            >
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              name="avatar"
              // value={avatar}
              onChange={handleAvatarChange}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
            />
            {avatar && (
              <div className="mt-4">
                <p className="text-sm text-gray-400">Avatar Preview:</p>
                <div className="relative w-24 h-24 mt-2 mx-auto">
                  <img
                    src={avatar}
                    alt="Avatar Preview"
                    className="w-full h-full rounded-full object-cover border-2 border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="absolute top-0 right-0 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-400 text- mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-gray-200 underlin</p>e">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}