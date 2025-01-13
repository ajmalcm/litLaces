import React from 'react'

const EmailSection = () => {
  return (
    <div className='flex flex-col gap-4  py-12 font-mono justify-center items-center'>
      <h3 className='text-3xl font-bold font-mono text-center'>Subscribe to our emails</h3>
      <div className='flex justify-between items-center border-[1px] border-white rounded-lg bg-black text-white xs:px-0 w-[100%]  px-2 py-4'>
      <input type='email' placeholder='Email' className='outline-none border-none bg-black'/>
      <span className='text-white text-right'>{'->'}</span>
      </div>
    </div>
  )
}

export default EmailSection