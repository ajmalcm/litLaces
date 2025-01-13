"use client"

import DashCard from "@/components/dashboard/DashCard"
import Navbar from "@/components/dashboard/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"
import LineChart from "@/components/dashboard/LineChart"
import PieChart from "@/components/dashboard/PieChart"
import BarChart from "@/components/dashboard/BarChart"
import Areachart from "@/components/dashboard/AreaChart"
import { dashLinks, NewOrders } from "@/utils/temp"
import Image from "next/image"
import LatestOrdersCard from "@/components/dashboard/LatestOrdersCard"

const Dashboard = () => {
  return (

      <div className="flex flex-1">

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {dashLinks.map((item, index) => (
              <DashCard
                key={index}
                icon={item.icon}
                header={item.header}
                content={item.content}
                color={item.color}
              />
            ))}
          </div>

          {/* Main Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Line Chart */}
            <div className="col-span-2 bg-gray-900 rounded-lg shadow-md">
              <LineChart />
            </div>

            {/* Recent Orders */}
            <div className="bg-gray-900 rounded-lg p-6 shadow-md col-span-2 lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">New Orders</h2>
              <ul className="space-y-4">
                {NewOrders.map((order, index) => (
                  <LatestOrdersCard key={index} image={order.image} id={order.id} amount={order.amount} status={order.status} customer={order.customer}/>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-900 rounded-lg shadow-md">
              <PieChart />
            </div>
            <div className="bg-gray-900 rounded-lg shadow-md">
              <BarChart />
            </div>
            <div className="bg-gray-900 rounded-lg shadow-md">
              <Areachart />
            </div>
          </div>
        </main>
      </div>
  )
}

export default Dashboard
