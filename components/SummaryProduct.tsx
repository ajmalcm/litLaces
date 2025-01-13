import Image from 'next/image'
import React from 'react'

const SummaryProduct = ({image,name,size,price,quantity}:{image:any,name:string,size:string,price:number,quantity:any}) => {
  return (
    <div className="relative flex items-center mb-6">
            <div className="relative w-20 h-20">
              <Image
                src={image} 
                alt="Product"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-md"
              />
              {/* Quantity Badge */}
              <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full border border-gray-700 shadow">
                {quantity}
              </span>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-white text-sm">
                {name}
              </p>
              <p className="text-sm text-gray-400">{size}</p>
            </div>
            <p className="ml-auto font-bold text-gray-300">₹{price}</p>
          </div>
  )
}

export default SummaryProduct