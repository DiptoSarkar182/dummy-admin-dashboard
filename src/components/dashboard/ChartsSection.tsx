import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Maximize2, BarChart2, LineChart, PieChart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
          <div className="flex items-center justify-center h-full">
            <BarChart2 className="w-16 h-16 text-muted-foreground" />
            {/* Chart.js or other chart library would be implemented here */}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="h-[400px]">
          <div className="flex items-center justify-center h-full">
            <LineChart className="w-16 h-16 text-muted-foreground" />
            {/* Chart.js or other chart library would be implemented here */}
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="h-[400px]">
          <div className="flex items-center justify-center h-full">
            <PieChart className="w-16 h-16 text-muted-foreground" />
            {/* Chart.js or other chart library would be implemented here */}
          </div>
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
          <div className="flex items-center justify-center h-full">
            {expandedChart === "daily" && (
              <BarChart2 className="w-32 h-32 text-muted-foreground" />
            )}
            {expandedChart === "weekly" && (
              <LineChart className="w-32 h-32 text-muted-foreground" />
            )}
            {expandedChart === "monthly" && (
              <PieChart className="w-32 h-32 text-muted-foreground" />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ChartsSection;
