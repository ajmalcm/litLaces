import Image from 'next/image'
import React from 'react'
import About from "@/public/assets/HomeAbout.jpg";

const HomeAbout = () => {
  return (
    <div className='flex items-center gap-3 flex-wrap md:w-[70%] md:mx-auto md:mt-10 bg-[#e1e1e1] rounded-xl'>
        {/* left */}
        <div className='md:flex-[0.5]'>
            <Image src={About} alt="home about" height={400} width={500} className='rounded-t-xl'/>
        </div>
        {/* right */}
        <div className='flex flex-col md:flex-[0.5] text-left font-mono px-4 gap-5 pb-4'>
            <p className='text-sm tracking-wider capitalize'>WE ARE</p>
            <p className='text-4xl font-bold font-sans'>LIT LACES</p>
            <p className='tracking-widest font-thin'>Hey there! At LIT LACES, we’ve got your back—or rather, your feet! We’re all about helping you find shoes that are stylish, comfy, and totally reliable. Every pair is handpicked with care, so you can shop stress-free and feel amazing in every step. You’re in good hands here, promise!</p>
            <button className='px-2 py-3 bg-black text-white rounded-lg'>{'Shop All ->'}</button>
        </div>
    </div>
  )
}

export default HomeAbout