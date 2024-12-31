import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const AnalyticsPage = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("7d");
  const [stats, setStats] = useState([
    {
      title: "Total Users",
      value: "12,345",
      change: "+12.3%",
      trend: "up",
    },
    {
      title: "Active Sessions",
      value: "1,234",
      change: "+5.6%",
      trend: "up",
    },
    {
      title: "Bounce Rate",
      value: "42.3%",
      change: "-2.1%",
      trend: "down",
    },
    {
      title: "Avg. Session",
      value: "4m 32s",
      change: "+0.8%",
      trend: "up",
    },
  ]);

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value:
            stat.title === "Total Users"
              ? (
                  parseInt(stat.value.replace(/,/g, "")) +
                  Math.floor(Math.random() * 10)
                ).toLocaleString()
              : stat.value,
          change: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 2).toFixed(1)}%`,
          trend: Math.random() > 0.5 ? "up" : "down",
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your analytics report is being generated...",
    });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [1200, 1900, 3000, 5000, 6000, 7000],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
      },
    ],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
      },
    ],
  };

  const demographicsData = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      {
        data: [15, 30, 25, 20, 10],
        backgroundColor: [
          "#4F46E5",
          "#7C3AED",
          "#EC4899",
          "#F59E0B",
          "#10B981",
        ],
      },
    ],
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold animate-slideDown">Analytics</h1>
          <p className="text-muted-foreground mt-1 animate-slideDown animation-delay-150">
            Track your key metrics and performance
          </p>
        </div>
        <div className="flex gap-2 animate-slideLeft">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`p-4 animate-fadeIn hover:scale-105 transition-transform duration-200`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <span
                className={`flex items-center ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 animate-bounce" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 animate-bounce" />
                )}
                <span className="text-sm font-medium">{stat.change}</span>
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 animate-fadeIn animation-delay-500">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traffic Sources */}
            <Card className="p-6 animate-slideUp">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Traffic Sources</h3>
                <Select defaultValue="7d">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {[
                  { source: "Direct", value: 35, color: "bg-blue-500" },
                  {
                    source: "Organic Search",
                    value: 25,
                    color: "bg-green-500",
                  },
                  { source: "Referral", value: 20, color: "bg-yellow-500" },
                  { source: "Social", value: 15, color: "bg-purple-500" },
                  { source: "Other", value: 5, color: "bg-gray-500" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="space-y-2 animate-slideRight"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between text-sm">
                      <span>{item.source}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} animate-progressBar`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* User Growth */}
            <Card className="p-6 animate-slideUp animation-delay-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">User Growth</h3>
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[300px]">
                <Line options={chartOptions} data={userGrowthData} />
              </div>
            </Card>

            {/* Revenue Analytics */}
            <Card className="p-6 animate-slideUp animation-delay-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Revenue Analytics</h3>
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[300px]">
                <Bar options={chartOptions} data={revenueData} />
              </div>
            </Card>

            {/* User Demographics */}
            <Card className="p-6 animate-slideUp animation-delay-400">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">User Demographics</h3>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
              <div className="h-[300px]">
                <Pie
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        ...chartOptions.plugins.legend,
                        position: "right" as const,
                      },
                    },
                  }}
                  data={demographicsData}
                />
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Page Load Time */}
            <Card className="p-6 animate-slideUp">
              <h3 className="text-lg font-semibold mb-4">Page Load Time</h3>
              <div className="space-y-4">
                {[
                  { page: "/home", time: "0.8s", color: "bg-green-500" },
                  { page: "/products", time: "1.2s", color: "bg-yellow-500" },
                  { page: "/checkout", time: "1.5s", color: "bg-red-500" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="space-y-2 animate-slideRight"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between text-sm">
                      <span>{item.page}</span>
                      <span className="font-medium">{item.time}</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} animate-progressBar`}
                        style={{
                          width: `${(parseFloat(item.time) / 2) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Error Rates */}
            <Card className="p-6 animate-slideUp animation-delay-200">
              <h3 className="text-lg font-semibold mb-4">Error Rates</h3>
              <div className="space-y-4">
                {[
                  { type: "404 Errors", count: 23, trend: "down" },
                  { type: "API Failures", count: 12, trend: "up" },
                  { type: "JS Errors", count: 8, trend: "down" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg animate-fadeIn"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <span>{item.type}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.count}</span>
                      {item.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Server Response Time */}
            <Card className="p-6 animate-slideUp animation-delay-300">
              <h3 className="text-lg font-semibold mb-4">
                Server Response Time
              </h3>
              <div className="h-[300px]">
                <Line
                  options={chartOptions}
                  data={{
                    labels: ["12am", "4am", "8am", "12pm", "4pm", "8pm"],
                    datasets: [
                      {
                        label: "Response Time (ms)",
                        data: [150, 230, 180, 400, 280, 220],
                        borderColor: "rgb(99, 102, 241)",
                        backgroundColor: "rgba(99, 102, 241, 0.1)",
                        fill: true,
                      },
                    ],
                  }}
                />
              </div>
            </Card>

            {/* Resource Usage */}
            <Card className="p-6 animate-slideUp animation-delay-400">
              <h3 className="text-lg font-semibold mb-4">Resource Usage</h3>
              <div className="space-y-6">
                {[
                  { name: "CPU", usage: 65 },
                  { name: "Memory", usage: 82 },
                  { name: "Disk", usage: 45 },
                ].map((resource, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{resource.name}</span>
                      <span className="font-medium">{resource.usage}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full animate-progressBar ${resource.usage > 80 ? "bg-red-500" : resource.usage > 60 ? "bg-yellow-500" : "bg-green-500"}`}
                        style={{ width: `${resource.usage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Sessions */}
            <Card className="p-6 animate-slideUp">
              <h3 className="text-lg font-semibold mb-4">User Sessions</h3>
              <div className="space-y-4">
                {[
                  { duration: "0-1 min", count: 234 },
                  { duration: "1-5 mins", count: 645 },
                  { duration: "5-15 mins", count: 432 },
                  { duration: "15+ mins", count: 189 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-secondary/20 rounded-lg transition-colors animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span>{item.duration}</span>
                    <span className="font-medium">{item.count} users</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Popular Pages */}
            <Card className="p-6 animate-slideUp animation-delay-200">
              <h3 className="text-lg font-semibold mb-4">Popular Pages</h3>
              <div className="space-y-4">
                {[
                  { page: "/home", views: 12453 },
                  { page: "/products", views: 8765 },
                  { page: "/about", views: 5432 },
                  { page: "/contact", views: 3211 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-secondary/20 rounded-lg transition-colors animate-fadeIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span>{item.page}</span>
                    <span className="font-medium">
                      {item.views.toLocaleString()} views
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* User Interactions */}
            <Card className="p-6 animate-slideUp animation-delay-300">
              <h3 className="text-lg font-semibold mb-4">User Interactions</h3>
              <div className="h-[300px]">
                <Bar
                  options={chartOptions}
                  data={{
                    labels: [
                      "Clicks",
                      "Forms",
                      "Downloads",
                      "Shares",
                      "Comments",
                    ],
                    datasets: [
                      {
                        label: "Interactions",
                        data: [1234, 876, 543, 321, 234],
                        backgroundColor: "rgba(99, 102, 241, 0.8)",
                      },
                    ],
                  }}
                />
              </div>
            </Card>

            {/* Engagement by Device */}
            <Card className="p-6 animate-slideUp animation-delay-400">
              <h3 className="text-lg font-semibold mb-4">
                Engagement by Device
              </h3>
              <div className="h-[300px]">
                <Pie
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        ...chartOptions.plugins.legend,
                        position: "right" as const,
                      },
                    },
                  }}
                  data={{
                    labels: ["Desktop", "Mobile", "Tablet"],
                    datasets: [
                      {
                        data: [55, 35, 10],
                        backgroundColor: ["#4F46E5", "#EC4899", "#10B981"],
                      },
                    ],
                  }}
                />
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <style jsx global>{`
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideLeft {
          from {
            transform: translateX(20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideRight {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes progressBar {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }

        .animate-slideLeft {
          animation: slideLeft 0.5s ease-out forwards;
        }

        .animate-slideRight {
          animation: slideRight 0.5s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-progressBar {
          animation: progressBar 1s ease-out forwards;
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  );
};

export default AnalyticsPage;
