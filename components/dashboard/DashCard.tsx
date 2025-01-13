import React from 'react'

const DashCard = ({icon:Icon,header,content,color}:{icon:any,header:string,content:string,color:string}) => {
console.log(color)

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-md flex items-center space-x-4">
              <div className="p-3 bg-gray-800 rounded-full">
                {/* Icon */}
                <Icon className={`text-3xl ${color} `}/>
              </div>
              <div>
                <p className="text-sm text-gray-400">{header}</p>
                <h2 className="text-2xl font-extrabold">{content}</h2>
              </div>
            </div>
  )
}

export default DashCard