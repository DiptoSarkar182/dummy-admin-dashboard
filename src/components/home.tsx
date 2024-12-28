import React from "react";
import MetricsGrid from "./dashboard/MetricsGrid";
import ChartsSection from "./dashboard/ChartsSection";

const Home = () => {
  return (
    <div className="p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
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
