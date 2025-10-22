
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
import { useEffect, useState } from "react";
import { set } from "mongoose";


// Updated chart configuration
const chartConfig = {
  revenue: {
    label: "Revenue (INR)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type DataPoint = {
  date: string;
  revenue: number;
  orderCount?: number;
  [key: string]: any;
};

export default function Linechart({ data }: { data: DataPoint[] }) {

  const [timeRange, setTimeRange] = useState("90d");
  const [graphData, setGraphData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const newGraphData= data?.map(({ orderCount, ...rest }: DataPoint) => ({ ...rest } as DataPoint));
    setGraphData(newGraphData);
    console.log(newGraphData);
    if (timeRange === "7d") {
      //set data to last 7 days
      setGraphData(newGraphData.slice(-7));
    }
    else if (timeRange === "30d") {
      //set data to last 30 days
      setGraphData(newGraphData.slice(-30));
    }
    else {
      //set data to last 3 months (90 days)
      setGraphData(newGraphData.slice(-90));
    }
  }, [timeRange])

  console.log(graphData)

  return (
    <Card className="w-full bg-gray-900 text-white border-gray-800 sm:relative">
      <CardHeader>
        {/* <div > */}
        <CardTitle >Monthly Revenue</CardTitle>
        <CardDescription >January - June 2024 (in INR)</CardDescription>
        {/* </div> */}
        {/* <div > */}
        <Select value={timeRange} onValueChange={setTimeRange} >
          <SelectTrigger
            className="w-[160px] rounded-lg flex bg-gray-900  border-gray-800 sm:absolute top-2 right-3"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-gray-900  border-gray-800 text-white">
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
        {/* </div> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={graphData}
            margin={{
              left: 12,
              right: 12,
              top: 16,
              bottom: 8,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              style={{ fill: "white" }}
              className="text-black"
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
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                className="text-black"
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

