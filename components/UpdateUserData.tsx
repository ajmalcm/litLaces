"use client"
import { useGetUserDetailsQuery, useUpdateUserMutation } from '@/redux/services/userReducers'
import { Close } from '@mui/icons-material'
import React, {use, useEffect, useState } from 'react'
import { toast } from 'sonner'

const UpdateUserData = ({showModal,setShowModal,id}:{showModal:boolean,setShowModal:Function,id:String}) => {

    const [UserInfo,setUserInfo]=useState({
        name:"",
        email:"",
        role:"user"
    })

    const [updateUserMutation]=useUpdateUserMutation();
    const {data,isLoading,error}=useGetUserDetailsQuery(id);
    console.log(data);

    const {name,email,role}=UserInfo;

    const updateHandler=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!name || !email || !role){
            toast.error("All fields are required");
            return;
        }
        const {data,error}=await updateUserMutation({id,name,email,role});
        if(data && data?.success){
            toast.success(data?.message);
            setShowModal(false);
        }
        if(error){
            toast.error("Something went wrong");
        }

    }

    
    const onChangeHandler=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
        setUserInfo({...UserInfo,[e.target.name]:e.target.value})
    }
    
    useEffect(() => {
      
    if(data && data?.success){
        setUserInfo({
            name:data.user.name,
            email:data.user.email,
            role:data.user.role
        })
     
    }
    }, [data])    

    
  return (
    data && data?.success &&
    <div className="w-full mx-auto">
        <form className='w-[80%] md:w-[50%] mx-auto bg-gray-800 p-6 rounded-lg shadow-lg relative'onSubmit={updateHandler}>
        <h2 className='text-2xl font-bold mb-4 text-white text center'>Update User Data</h2>
        <div className='mb-4'>
            <label htmlFor='name' className='block text-gray-300 font-medium mb-2'>Update Name</label>
            <input type='text' id='name' className='w-full p-2 border border-gray-600 rounded bg-gray-700 text-white' placeholder='Enter your name' name="name" value={name}  onChange={onChangeHandler}/>
        </div>
        <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-300 font-medium mb-2'>Update Email</label>
            <input type='email' id='email' className='w-full p-2 border border-gray-600 rounded bg-gray-700 text-white' placeholder='Enter your email' name="email" value={email}  onChange={onChangeHandler}/>
        </div>
        <div>
            <label htmlFor='role' className='block text-gray-300 font-medium mb-2'>Update Role</label>
            <select id="role" name="role" className='w-full p-2 border border-gray-600 rounded bg-gray-700 text-white' value={role} onChange={onChangeHandler}>
                <option value={role}>{role}</option>
               {
                role==="admin"?<option value="user">user</option>:<option value="admin">admin</option>
               }
            </select>
        </div>
        <Close className='absolute top-4 right-4 cursor-pointer text-white' onClick={() => setShowModal(false)}/>
        <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'>Update</button>
        </form>
    </div>
  )
}

export default UpdateUserData