import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface ChartsSectionProps {
  dailyStats?: {
    labels: string[];
    data: number[];
  };
  weeklyStats?: {
    labels: string[];
    data: number[];
  };
  monthlyStats?: {
    labels: string[];
    data: number[];
  };
}

const ChartsSection = ({
  dailyStats = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [65, 59, 80, 81, 56, 55, 40],
  },
  weeklyStats = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [100, 120, 140, 160],
  },
  monthlyStats = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [200, 300, 250, 400, 380, 420],
  },
}: ChartsSectionProps) => {
  const [expandedChart, setExpandedChart] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("daily");

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const getChartData = (labels: string[], data: number[], type: string) => ({
    labels,
    datasets: [
      {
        label: `${type} Data`,
        data,
        borderColor: "rgb(99, 102, 241)",
        backgroundColor:
          type === "daily" ? "rgb(99, 102, 241)" : "rgba(99, 102, 241, 0.2)",
        fill: type !== "daily",
        tension: 0.4,
      },
    ],
  });

  return (
    <Card className="w-full h-[600px] bg-white dark:bg-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setExpandedChart(activeTab)}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="daily"
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="h-[400px]">
          <Bar
            options={chartOptions}
            data={getChartData(dailyStats.labels, dailyStats.data, "daily")}
          />
        </TabsContent>

        <TabsContent value="weekly" className="h-[400px]">
          <Line
            options={chartOptions}
            data={getChartData(weeklyStats.labels, weeklyStats.data, "weekly")}
          />
        </TabsContent>

        <TabsContent value="monthly" className="h-[400px]">
          <Line
            options={chartOptions}
            data={getChartData(
              monthlyStats.labels,
              monthlyStats.data,
              "monthly",
            )}
          />
        </TabsContent>
      </Tabs>

      <Dialog
        open={!!expandedChart}
        onOpenChange={() => setExpandedChart(null)}
      >
        <DialogContent className="max-w-[90vw] h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              {expandedChart?.charAt(0).toUpperCase() + expandedChart?.slice(1)}{" "}
              Analytics
            </DialogTitle>
          </DialogHeader>
          <div className="h-full p-6">
            {expandedChart === "daily" && (
              <Bar
                options={chartOptions}
                data={getChartData(dailyStats.labels, dailyStats.data, "daily")}
              />
            )}
            {expandedChart === "weekly" && (
              <Line
                options={chartOptions}
                data={getChartData(
                  weeklyStats.labels,
                  weeklyStats.data,
                  "weekly",
                )}
              />
            )}
            {expandedChart === "monthly" && (
              <Line
                options={chartOptions}
                data={getChartData(
                  monthlyStats.labels,
                  monthlyStats.data,
                  "monthly",
                )}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ChartsSection;
