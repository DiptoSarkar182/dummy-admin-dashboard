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

        {/* ... rest of the tabs content ... */}
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
