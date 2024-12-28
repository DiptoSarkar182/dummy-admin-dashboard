import React from "react";
import MetricsGrid from "./dashboard/MetricsGrid";
import ChartsSection from "./dashboard/ChartsSection";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Calendar, Users } from "lucide-react";

const Home = () => {
  const recentActivities = [
    {
      icon: <Users className="h-4 w-4" />,
      title: "New User Registration",
      description: "John Doe joined the platform",
      time: "2 mins ago",
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      title: "Meeting Scheduled",
      description: "Team sync at 3 PM",
      time: "10 mins ago",
    },
    {
      icon: <Bell className="h-4 w-4" />,
      title: "System Update",
      description: "Version 2.0 deployed successfully",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Admin</h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your dashboard today.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              {new Date().toLocaleDateString()}
            </p>
            <p className="text-xs text-muted-foreground">
              Last login: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="animate-[slideDown_0.5s_ease-in-out]">
          <MetricsGrid
            metrics={[
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
            ]}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          {/* Charts Section */}
          <div className="animate-[slideUp_0.5s_ease-in-out]">
            <ChartsSection
              dailyStats={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                data: [65, 59, 80, 81, 56, 55, 40],
              }}
              weeklyStats={{
                labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                data: [100, 120, 140, 160],
              }}
              monthlyStats={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                data: [200, 300, 250, 400, 380, 420],
              }}
            />
          </div>

          {/* Recent Activity */}
          <Card className="h-[600px] bg-white dark:bg-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ScrollArea className="h-[520px] pr-4">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{activity.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      <span className="text-xs text-muted-foreground mt-2 block">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
      `}</style>
    </div>
  );
};

export default Home;
