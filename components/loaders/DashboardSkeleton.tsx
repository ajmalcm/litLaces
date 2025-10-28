"use client"

import React from "react"

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-1">
      <main className="flex-1 p-4 md:p-6">
        {/* Top stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-lg bg-gray-800 animate-pulse flex items-center px-4"
            >
              <div className="h-10 w-10 bg-gray-700 rounded mr-4" />
              <div className="w-full">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-6 bg-gray-700 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>

        {/* Main charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-gray-900 rounded-lg shadow-md p-6">
            <div className="h-56 bg-gray-800 rounded animate-pulse" />
          </div>

          <div className="bg-gray-900 rounded-lg p-6 shadow-md col-span-2 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">New Orders</h2>
            <ul className="space-y-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-700 rounded animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
                    <div className="h-3 bg-gray-700 rounded w-1/4" />
                  </div>
                  <div className="h-6 w-20 bg-gray-700 rounded" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <div className="h-40 bg-gray-800 rounded animate-pulse" />
          </div>
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <div className="h-40 bg-gray-800 rounded animate-pulse" />
          </div>
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <div className="h-40 bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  )
}
