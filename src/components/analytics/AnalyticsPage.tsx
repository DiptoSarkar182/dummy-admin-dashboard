import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";

const AnalyticsPage = () => {
  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
            <div className="flex items-center justify-center h-[200px]">
              <PieChart className="w-16 h-16 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">User Growth</h3>
            <div className="flex items-center justify-center h-[200px]">
              <LineChart className="w-16 h-16 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue Analytics</h3>
            <div className="flex items-center justify-center h-[200px]">
              <BarChart className="w-16 h-16 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Conversion Rates</h3>
            <div className="flex items-center justify-center h-[200px]">
              <LineChart className="w-16 h-16 text-muted-foreground" />
            </div>
          </Card>
        </div>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
