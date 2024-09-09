import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface BarChartProps {
  data: Array<Record<string, any>>;
  index: string;
  categories: string[];
  yAxisWidth: number;
  onValueChange?: (value: any) => void;
  className?: string;
  valueFormatter?: (value: number) => string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showLegend?: boolean;
  type?: "default" | "stacked" | "percent";
  colors?: Record<string, string>;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  index,
  categories,
  yAxisWidth,
  onValueChange,
  className,
  valueFormatter,
  xAxisLabel,
  yAxisLabel,
  showLegend = true,
  type = "default",
  colors = {},
}) => {
  const BarChartComponent =
    type === "stacked" ? RechartsBarChart : RechartsBarChart;

  return (
    <BarChartComponent
      width={1050}
      height={300}
      data={data}
      className={className}
      onMouseMove={onValueChange}
      stackOffset={type === "stacked" ? "expand" : undefined}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={index}
        label={
          xAxisLabel
            ? { value: xAxisLabel, position: "insideBottomRight", offset: -20 }
            : undefined
        }
      />
      <YAxis
        width={yAxisWidth}
        label={
          yAxisLabel
            ? {
                value: yAxisLabel,
                angle: -90,
                position: "insideLeft",
                offset: 0,
              }
            : undefined
        }
      />
      <Tooltip formatter={valueFormatter} />
      {showLegend && <Legend />}
      {categories.map((category, idx) => (
        <Bar
          key={idx}
          dataKey={category}
          fill={colors[category] || "#8884d8"}
        />
      ))}
    </BarChartComponent>
  );
};
