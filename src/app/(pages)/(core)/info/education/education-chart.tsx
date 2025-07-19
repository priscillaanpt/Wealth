"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Text } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { cn, formatToRupiah } from "~/lib/utils";

const chartConfig = {
  cost: {
    label: "BIAYA PENDIDIKAN ANAK",
    color: "#4458FE",
  },
  fundAllocated: {
    label: "TABUNGAN SAAT INI",
    color: "#00D0B5",
  },
} satisfies ChartConfig;

interface EducationChartProps {
  className?: string;
  chartData: {
    parentAge: number;
    childAge: number;
    stageName: string;
    cost: number;
    fundAllocated: number;
  }[];
}

interface ViewBoxProps {
  viewBox: { x: number; y: number; width: number; height: number };
}

export function EducationChart({ className, chartData }: EducationChartProps) {
  return (
    <div className={cn("bg-white p-6", className)}>
      <div className="mt-5 ml-3 flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className={`h-6 w-6 rounded-full bg-[#4458FE]`} />
          <h3 className="text-xl font-bold">{chartConfig.cost.label}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-6 w-6 rounded-full bg-[#00D0B5]`} />
          <h3 className="text-xl font-bold">
            {chartConfig.fundAllocated.label}
          </h3>
        </div>
      </div>
      <ChartContainer
        config={chartConfig}
        className="mt-14 min-h-[200px] w-full"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="stageName"
            tickLine={false}
            tickMargin={23}
            axisLine={false}
            xAxisId="0"
            label={({ viewBox }: ViewBoxProps) => (
              <Text
                x={0}
                y={viewBox.y + 37}
                textAnchor="start"
                fontSize={14}
                fontWeight="bold"
              >
                PENDIDIKAN
              </Text>
            )}
          />
          <XAxis
            dataKey="parentAge"
            tickLine={false}
            tickMargin={23}
            axisLine={false}
            xAxisId="1"
            allowDuplicatedCategory={false}
            label={({ viewBox }: ViewBoxProps) => (
              <Text
                x={0}
                y={viewBox.y + 36}
                textAnchor="start"
                fontSize={14}
                fontWeight="bold"
              >
                UMUR ANDA
              </Text>
            )}
          />
          <XAxis
            dataKey="childAge"
            tickLine={false}
            tickMargin={20}
            axisLine={false}
            xAxisId="2"
            allowDuplicatedCategory={false}
            label={({ viewBox }: ViewBoxProps) => (
              <Text
                x={0}
                y={viewBox.y + 35}
                textAnchor="start"
                fontSize={14}
                fontWeight="bold"
              >
                USIA ANAK
              </Text>
            )}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: string) =>
              `Rp${formatToRupiah(value.toString())}`
            }
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="cost" fill="var(--color-cost)" radius={4} />
          <Bar
            dataKey="fundAllocated"
            fill="var(--color-fundAllocated)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
