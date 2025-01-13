"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Updated chartData for the last 7 days
const chartData = [
  { day: "Mo", online: 150, inStore: 70 },
  { day: "Tue", online: 200, inStore: 90 },
  { day: "Wed", online: 180, inStore: 110 },
  { day: "Thu", online: 220, inStore: 100 },
  { day: "Fri", online: 250, inStore: 120 },
  { day: "Sat", online: 300, inStore: 150 },
  { day: "Sun", online: 280, inStore: 130 },
]

// Updated chartConfig for sales
const chartConfig = {
  online: {
    label: "Online Sales",
    color: "hsl(var(--chart-1))",
  },
  inStore: {
    label: "In-Store Sales",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Areachart() {
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
            data={chartData}
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
            <Area
              dataKey="inStore"
              type="natural"
              fill="var(--color-inStore)"
              fillOpacity={0.4}
              stroke="var(--color-inStore)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 12.5% this week <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Last 7 Days
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}
