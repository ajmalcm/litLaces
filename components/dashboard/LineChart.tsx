
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Updated data for monthly revenue in INR
const revenueData = [
  { month: "January", revenue: 186000 },
  { month: "February", revenue: 305000 },
  { month: "March", revenue: 237000 },
  { month: "April", revenue: 73000 },
  { month: "May", revenue: 209000 },
  { month: "June", revenue: 214000 },
];

// Updated chart configuration
const chartConfig = {
  revenue: {
    label: "Revenue (INR)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Linechart() {
  return (
    <Card className="w-full bg-gray-900 text-white border-gray-800">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>January - June 2024 (in INR)</CardDescription>
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              style={{ fill: "white" }}
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ r: 4, fill: "hsl(var(--chart-1))" }}
            />
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

