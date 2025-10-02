
"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";

// Updated data for monthly revenue in INR
// const revenueData = [
//   { month: "January", revenue: 186000 },
//   { month: "February", revenue: 305000 },
//   { month: "March", revenue: 237000 },
//   { month: "April", revenue: 73000 },
//   { month: "May", revenue: 209000 },
//   { month: "June", revenue: 214000 },
// ];

const revenueData = [
  { date: "2024-04-01", revenue: 222 },
  { date: "2024-04-02", revenue: 97 },
  { date: "2024-04-03", revenue: 167 },
  { date: "2024-04-04", revenue: 242 },
  { date: "2024-04-05", revenue: 373 },
  { date: "2024-04-06", revenue: 301 },
  { date: "2024-04-07", revenue: 245 },
  { date: "2024-04-08", revenue: 409 },
  { date: "2024-04-09", revenue: 59 },
  { date: "2024-04-10", revenue: 261 },
  { date: "2024-04-11", revenue: 327 },
  { date: "2024-04-12", revenue: 292 },
  { date: "2024-04-13", revenue: 342 },
  { date: "2024-04-14", revenue: 137 },
  { date: "2024-04-15", revenue: 120 },
  { date: "2024-04-16", revenue: 138 },
  { date: "2024-04-17", revenue: 446 },
  { date: "2024-04-18", revenue: 364 },
  { date: "2024-04-19", revenue: 243 },
  { date: "2024-04-20", revenue: 89 },
  { date: "2024-04-21", revenue: 137 },
  { date: "2024-04-22", revenue: 224 },
  { date: "2024-04-23", revenue: 138 },
  { date: "2024-04-24", revenue: 387 },
  { date: "2024-04-25", revenue: 215 },
  { date: "2024-04-26", revenue: 75 },
  { date: "2024-04-27", revenue: 383 },
  { date: "2024-04-28", revenue: 122 },
  { date: "2024-04-29", revenue: 315 },
  { date: "2024-04-30", revenue: 454 },
  { date: "2024-05-01", revenue: 165 },
  { date: "2024-05-02", revenue: 293 },
  { date: "2024-05-03", revenue: 247 },
  { date: "2024-05-04", revenue: 385 },
  { date: "2024-05-05", revenue: 481 },
  { date: "2024-05-06", revenue: 498 },
  { date: "2024-05-07", revenue: 388 },
  { date: "2024-05-08", revenue: 149 },
  { date: "2024-05-09", revenue: 227 },
  { date: "2024-05-10", revenue: 293 },
  { date: "2024-05-11", revenue: 335 },
  { date: "2024-05-12", revenue: 197 },
  { date: "2024-05-13", revenue: 197 },
  { date: "2024-05-14", revenue: 448 },
  { date: "2024-05-15", revenue: 473 },
  { date: "2024-05-16", revenue: 338 },
  { date: "2024-05-17", revenue: 499 },
  { date: "2024-05-18", revenue: 315 },
  { date: "2024-05-19", revenue: 235 },
  { date: "2024-05-20", revenue: 177 },
  { date: "2024-05-21", revenue: 82 },
  { date: "2024-05-22", revenue: 81 },
  { date: "2024-05-23", revenue: 252 },
  { date: "2024-05-24", revenue: 294 },
  { date: "2024-05-25", revenue: 201 },
  { date: "2024-05-26", revenue: 213 },
  { date: "2024-05-27", revenue: 420 },
  { date: "2024-05-28", revenue: 233 },
  { date: "2024-05-29", revenue: 78 },
  { date: "2024-05-30", revenue: 340 },
  { date: "2024-05-31", revenue: 178 },
  { date: "2024-06-01", revenue: 178 },
  { date: "2024-06-02", revenue: 470 },
  { date: "2024-06-03", revenue: 103 },
  { date: "2024-06-04", revenue: 439 },
  { date: "2024-06-05", revenue: 88 },
  { date: "2024-06-06", revenue: 294 },
  { date: "2024-06-07", revenue: 323 },
  { date: "2024-06-08", revenue: 385 },
  { date: "2024-06-09", revenue: 438 },
  { date: "2024-06-10", revenue: 155 },
  { date: "2024-06-11", revenue: 92 },
  { date: "2024-06-12", revenue: 492 },
  { date: "2024-06-13", revenue: 81 },
  { date: "2024-06-14", revenue: 426 },
  { date: "2024-06-15", revenue: 307 },
  { date: "2024-06-16", revenue: 371 },
  { date: "2024-06-17", revenue: 475 },
  { date: "2024-06-18", revenue: 107 },
  { date: "2024-06-19", revenue: 341 },
  { date: "2024-06-20", revenue: 408 },
  { date: "2024-06-21", revenue: 169 },
  { date: "2024-06-22", revenue: 317 },
  { date: "2024-06-23", revenue: 480 },
  { date: "2024-06-24", revenue: 132 },
  { date: "2024-06-25", revenue: 141 },
  { date: "2024-06-26", revenue: 434 },
  { date: "2024-06-27", revenue: 448 },
  { date: "2024-06-28", revenue: 149 },
  { date: "2024-06-29", revenue: 103 },
  { date: "2024-06-30", revenue: 446 },
];

// Updated chart configuration
const chartConfig = {
  revenue: {
    label: "Revenue (INR)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Linechart() {

  const [timeRange, setTimeRange] = useState("90d")

  return (
    <Card className="w-full bg-gray-900 text-white border-gray-800">
      <CardHeader className="flex w-full">
        <div className="grid flex-1 gap-1">
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>January - June 2024 (in INR)</CardDescription>
        </div>
        <div className="bg-gray-900  border-gray-800">

        <Select value={timeRange} onValueChange={setTimeRange} >
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={revenueData}
            margin={{
              left: 12,
              right: 12,
              top: 16,
              bottom: 8,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              // dataKey="month"
              // tickFormatter={(value) => value.slice(0, 3)}
              style={{ fill: "white" }}
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            {/* <YAxis
            className="hidden md:flex"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `₹${value / 1000}K`}
              style={{ fill: "white" }}
            /> */}
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                className="bg-black text-white"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ r: 4, fill: "hsl(var(--chart-1))" }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing revenue trends for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}

