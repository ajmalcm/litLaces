"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Updated sales data
const salesData = [
  { month: "Jan", orders: 50, fill: "var(--color-chrome)" },
  { month: "Feb", orders: 150, fill: "var(--color-chrome)" },
  { month: "Mar", orders: 90, fill: "var(--color-chrome)" },
  { month: "Apr", orders: 120, fill: "var(--color-chrome)" },
  { month: "May", orders: 100, fill: "var(--color-chrome)" },
  { month: "Jun", orders: 200, fill: "var(--color-chrome)" },
];

// Chart configuration
const chartConfig = {
  sales: {
    label: "Sales (INR)",
  },
};

export default function TotalSalesChart() {
  return (
    <Card className="w-full bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Total orders by Month</CardTitle>
        <CardDescription>January - June 2024 (in INR)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={salesData}
            margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              style={{ fill: "white" }}
            />
            {/* <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `₹${value / 1000}K`}
              style={{ fill: "white" }}
            /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              formatter={(value) => `${value.toLocaleString()}`}
            />
            <Bar
              dataKey="orders"
              strokeWidth={2}
              radius={[8, 8, 0, 0]}
              activeBar={({ ...props }) => (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sales for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
