import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <div className='flex flex-col bg-black text-white font-light'>
        {/* top */}
        <div className='flex flex-col justify-center items-center gap-8 my-12'>
            <p>About Us</p>
            <InstagramIcon style={{color:'white'}} fontSize='medium'/>
        </div>
        {/* bottom */}
        <div className='flex justify-center items-center tracking-widest text-xs font-mono py-10 border-t-[1px] border-[#434343] px-4 text-center leading-7'>
        &copy; 2024, LIT LACES . Privacy policy . Terms of service . Shipping policy . Contact information
        </div>
    </div>
  )
}

export default Footer