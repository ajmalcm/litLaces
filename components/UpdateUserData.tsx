import { Close } from '@mui/icons-material'
import React from 'react'

const UpdateUserData = ({showModal,setShowModal}:{showModal:boolean,setShowModal:Function}) => {
  return (
    <div className="w-full mx-auto">
        <form className='w-[100%] mx-auto bg-gray-800 p-6 rounded-lg shadow-lg relative'onSubmit={(e:any) => {;e.preventDefault();setShowModal(false)}}>
        <h2 className='text-2xl font-bold mb-4 text-white' onClick={() => setShowModal(false)}>Update User Data</h2>
        <div className='mb-4'>
            <label htmlFor='name' className='block text-gray-300 font-medium mb-2'>Name</label>
            <input type='text' id='name' className='w-full p-2 border border-gray-600 rounded bg-gray-700 text-white' placeholder='Enter your name' />
        </div>
        <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-300 font-medium mb-2'>Email</label>
            <input type='email' id='email' className='w-full p-2 border border-gray-600 rounded bg-gray-700 text-white' placeholder='Enter your email' />
        </div>
        <div className='mb-4'>
            <label htmlFor='phone' className='block text-gray-300 font-medium mb-2'>phone</label>
            <input type='phone' id='phone' className='w-full p-2 border border-gray-600 rounded bg-gray-700 text-white' placeholder='Enter new password' />
        </div>  
        <div>
            <select className='w-full p-2 border border-gray-600 rounded bg-gray-700 text-white'>
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
            </select>
        </div>
        <Close className='absolute top-4 right-4 cursor-pointer text-white' onClick={() => setShowModal(false)}/>
        <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'>Update</button>
        </form>
    </div>
  )
}

export default UpdateUserData