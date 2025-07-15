"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLoginUserMutation } from "@/redux/services/userReducers";
import { toast } from "sonner";
import { setAdmin, setAuthenticated, setName } from "@/redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loginUser] = useLoginUserMutation();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const { email, password } = loginDetails;
  const dispatch=useDispatch();
  const navigate=useRouter();
  const {isAuthenticated,isAdmin}=useSelector((state:any)=>state.auth)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   const res= await loginUser(loginDetails);
   if("data" in res)
   {
    dispatch(setAuthenticated(true));
    dispatch(setAdmin(res.data.isAdmin));
    dispatch(setName(res.data.name));
    toast.success(res.data.message);
    setTimeout(()=>{
    toast.success(`Welcome ${res.data.user.name} 😎!`);
    },5000)
   }
   if("error" in res)
   {
    const errorMessage = res.error && 'data' in res.error ? (res.error.data as { message?: string })?.message || "Login failed" : "Login failed";
    toast.error(errorMessage);
   }
    
  };

  useEffect(()=>{
    if(isAuthenticated)
      navigate.push("/")

  },[isAuthenticated,navigate])

  return (
    <div className="min-h-[70vh] bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={onSubmitHandler}>
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
              onChange={changeHandler}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-gray-600 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
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
              onChange={changeHandler}
              className="w-full mt-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-gray-600 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-gray-200 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
