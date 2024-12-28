import React from "react";
import MetricCard from "./MetricCard";

interface MetricsGridProps {
  metrics?: Array<{
    title: string;
    value: string;
    change: number;
    trend: "up" | "down";
    description: string;
  }>;
}

const MetricsGrid = ({
  metrics = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: 12.5,
      trend: "up",
      description: "Compared to last month",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: -5.2,
      trend: "down",
      description: "Compared to last week",
    },
    {
      title: "Conversion Rate",
      value: "2.4%",
      change: 8.7,
      trend: "up",
      description: "30-day average",
    },
    {
      title: "Total Orders",
      value: "856",
      change: 3.2,
      trend: "up",
      description: "Past 24 hours",
    },
  ],
}: MetricsGridProps) => {
  return (
    <div className="w-full h-[240px] bg-slate-50 dark:bg-slate-900 p-6">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-[fadeIn_0.5s_ease-in-out]"
        style={
          {
            "--stagger-delay": "100ms",
          } as React.CSSProperties
        }
      >
        {metrics.map((metric, index) => (
          <div
            key={metric.title}
            className="opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <MetricCard {...metric} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;
