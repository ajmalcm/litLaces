import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Banner = ({img,alt,text,link}:{img:string | any,alt:string,text:string,link:string}) => {
  return (
    <div className='relative'>
      <Image src={img} alt={alt} className="border-b-2 border-white"  width={1550}/>
      {/* should add buttons like shop men shop women and shop all */}
      <Link href={`/collections/${link}`}>
      <button className='text-center bg-[#000] bg-opacity-70 text-opacity-100 text-white px-3 py-4 border-1 border-white rounded-md absolute  right-[50%] top-[50%] hover:border-2 hover:border-white transition-all delay-75 translate-x-[50%] -translate-y-[50%]'>{text+' ->'}</button>
      </Link>
    </div>
  )
}

export default Banner