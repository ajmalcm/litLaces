import Image from 'next/image'
import React from 'react'

const LatestOrdersCard = ({image,customer,amount,status,id}:{image:any,customer:string,amount:string,status:string,id:string}) => {
  return (
    <li
                        className="flex items-center justify-between bg-gray-800 p-4 rounded-md shadow"
                      >
                        <div className="flex items-center gap-4">
                          {/* Order Image */}
                          <Image
                            src={ image}
                            alt={ customer}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          {/* Order Details */}
                          <div>
                            <p className="font-medium text-white">{ customer}</p>
                            <p className="text-sm text-gray-500">{ id}</p>
                          </div>
                        </div>
                        {/* Order Status and Amount */}
                        <div className="text-right">
                          <p className="font-medium text-green-400">{ amount}</p>
                          <p
                            className={`text-sm ${
                               status === "Delivered"
                                ? "text-green-500"
                                :  status === "Processing"
                                ? "text-red-500"
                                : "text-yellow-500"
                            }`}
                          >
                            { status}
                          </p>
                        </div>
                      </li>
  )
}

export default LatestOrdersCard