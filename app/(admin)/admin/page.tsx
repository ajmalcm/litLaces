"use client";

import DashCard from "@/components/dashboard/DashCard";
import LineChart from "@/components/dashboard/LineChart";
import PieChart from "@/components/dashboard/PieChart";
import BarChart from "@/components/dashboard/BarChart";
import Areachart from "@/components/dashboard/AreaChart";
import { NewOrders } from "@/utils/temp";
import LatestOrdersCard from "@/components/dashboard/LatestOrdersCard";
import { useGetAdminStatsQuery } from "@/redux/services/userReducers";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import millify from "millify";
import { useState } from "react";

const Dashboard = () => {
  const { data, isLoading, error } = useGetAdminStatsQuery("");
  const [last3monthRev,setLast3MonthRev]=useState(0);
  // const [monthlyRev,setMonthlyRev]=useState(0);
  // const [weeklyRev,setWeeklyRev]=useState(0);

  const {
    totalRevenue,
    totalOrders,
    totalUsers,
    totalProducts,
    outOfStockProducts,
    inStockProducts,
    last5Orders,
  } = data || {};
  const dashLinks = [
    {
      icon: AttachMoneyIcon,
      header: "Total Revenue",
      content: millify(totalRevenue) || 0,
      color: "text-green-500",
    },
    {
      icon: ShoppingCartIcon,
      header: "Total Orders",
      content: millify(totalOrders) || 0,
      color: "text-blue-500",
    },
    {
      icon: InventoryIcon,
      header: "All Products",
      content: millify(totalProducts) || 0,
      color: "text-yellow-500",
    },
    {
      icon: PeopleIcon,
      header: "All Users",
      content: millify(totalUsers) || 0,
      color: "text-purple-500",
    },
  ];
  console.log(data?.yearOrderData);
  

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
              content={item.content as any}
              color={item.color}
            />
          ))}
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="col-span-2 bg-gray-900 rounded-lg shadow-md">
            <LineChart data={data?.yearOrderData as any}  />
          </div>

          {/* Recent Orders */}
          <div className="bg-gray-900 rounded-lg p-6 shadow-md col-span-2 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">New Orders</h2>
            <ul className="space-y-4">
              {data &&
                last5Orders?.slice(0,3)?.map((order: any, index: any) => (
                  <LatestOrdersCard
                    key={index}
                    image={order?.orderItems[0].image}
                    id={order._id}
                    amount={order.totalAmount}
                    status={order.deliveryStatus}
                    customer={
                      order?.shippingInfo?.firstName +
                      order?.shippingInfo?.lastName
                    }
                    paidAt={order?.paidAt}
                    itemsCount={order?.orderItems.length}
                  />
                ))}
            </ul>
          </div>
        </div>

        {/* Bottom Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-900 rounded-lg shadow-md">
            <PieChart
              inStock={inStockProducts}
              outOfStock={outOfStockProducts}
              totalProducts={totalProducts}
            />
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
  );
};

export default Dashboard;
