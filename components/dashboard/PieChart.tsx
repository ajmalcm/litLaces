"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

// Updated chart data

// Updated chart configuration
const chartConfig = {
  inStock: {
    label: "In-Stock",
    color: "hsl(var(--chart-1))",
  },
  outOfStock: {
    label: "Out-of-Stock",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Piechart({inStock,outOfStock,totalProducts}: {inStock?:number,outOfStock?:number,totalProducts?:number}) {
  const productStockData = [
    { status: "In-Stock", count: inStock, fill: "hsl(var(--chart-1))" },
    { status: "Out-of-Stock", count: outOfStock, fill: "hsl(var(--chart-2))" },
  ];

  return (
    <Card className="flex flex-col w-full bg-gray-900 text-white border-gray-800">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stock Status</CardTitle>
        <CardDescription>Product Inventory Overview</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={productStockData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          style={{filter:'invert(1)'}}
                          className="text-3xl font-bold"
                        >
                          {totalProducts}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Products
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 3.5% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Displaying stock status for the current inventory
        </div>
      </CardFooter> */}
    </Card>
  );
}
