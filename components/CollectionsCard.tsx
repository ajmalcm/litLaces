import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CollectionsCard = ({logo,text,link}:{logo:string | any,text:string,link:string}) => {
  return (
    <div className='flex flex-col gap-2 md:gap-4 rounded-lg bg-black text-white xs:flex-[0.5]'>
        <Link href={link}>
        <Image src={logo} alt={text} width={350} className='hidden md:block'/>
        <Image src={logo} alt={text} width={160} className='block sm:hidden'/>
        <button className='outline-none border-none self-start md:p-3 pl-4 text-lg font-mono font-bold'>{text+' ->'}</button>
        </Link>
    </div>
  )
}

export default CollectionsCard