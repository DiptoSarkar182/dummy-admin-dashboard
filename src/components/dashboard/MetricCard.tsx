import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title?: string;
  value?: string;
  change?: number;
  trend?: "up" | "down";
  description?: string;
}

const MetricCard = ({
  title = "Total Revenue",
  value = "$12,345",
  change = 12.5,
  trend = "up",
  description = "Compared to last month",
}: MetricCardProps) => {
  return (
    <Card className="w-[280px] h-[200px] bg-white dark:bg-slate-800 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader className="pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">{value}</span>
            <div
              className={`flex items-center gap-1 ${trend === "up" ? "text-green-500" : "text-red-500"}`}
            >
              {trend === "up" ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{change}%</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>

          {/* Animated progress bar */}
          <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary animate-[progress_1.5s_ease-in-out]"
              style={{ width: `${Math.min(Math.abs(change), 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
