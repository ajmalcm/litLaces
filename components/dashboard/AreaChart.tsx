"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { DataPoint } from "@/utils/temp";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

// Updated chartConfig for sales
const chartConfig = {
  online: {
    label: "Online Sales",
    color: "hsl(var(--chart-1))",
  },
  // inStore: {
  //   label: "In-Store Sales",
  //   color: "hsl(var(--chart-2))",
  // },
} satisfies ChartConfig;

export default function Areachart({ data }: { data: DataPoint[] }) {
  const [areaData, setAreaData] = useState([] as any);

  useEffect(() => {
    if (!data) return;

    // Step 1: Convert dates properly and sort
    const parsedData = data
      .map(({ orderCount, date }) => ({
        online: orderCount,
        day: new Date(date), // Keep real Date object
      }))
      .sort((a, b) => a.day.getTime() - b.day.getTime());

    // Step 2: Last 7 days range
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 6); // last 7 days including today

    // Step 3: Create a continuous 7-day dataset
    const completeData: { day: string; online: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const current = new Date(pastDate);
      current.setDate(pastDate.getDate() + i);

      // Check if data exists for this date
      const existing = parsedData.find(
        (item) => item.day.toDateString() === current.toDateString()
      );

      completeData.push({
        day: current.toLocaleDateString("en-US", { weekday: "short" }), // Mon, Tue
        online: existing?.online ?? 0, // If no order or undefined, set 0
      });
    }

    setAreaData(completeData);
  }, [data]);

  return (
    <Card className="bg-gray-900 text-white border-gray-800">
      <CardHeader>
        <CardTitle>Sales - Last 7 Days</CardTitle>
        <CardDescription>
          Showing sales trends for online and in-store sales
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={areaData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="online"
              type="natural"
              fill="var(--color-online)"
              fillOpacity={0.4}
              stroke="var(--color-online)"
              stackId="a"
            />
            {/* <Area
              dataKey="inStore"
              type="natural"
              fill="var(--color-inStore)"
              fillOpacity={0.4}
              stroke="var(--color-inStore)"
              stackId="a"
            /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  );
}
