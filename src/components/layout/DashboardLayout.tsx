import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300`}
    >
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className="flex-1 transition-all duration-300">
        <div className="p-4 flex justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="animate-[fadeIn_0.5s_ease-in-out]"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
