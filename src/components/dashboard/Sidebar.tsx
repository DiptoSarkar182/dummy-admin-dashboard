import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  Settings,
  HelpCircle,
  Bell,
  Calendar,
  BarChart,
  LogOut,
  User,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Sidebar = ({
  isCollapsed = false,
  onToggle = () => {},
}: SidebarProps) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navItems: NavItem[] = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/" },
    { icon: <BarChart size={20} />, label: "Analytics", href: "/analytics" },
    { icon: <Calendar size={20} />, label: "Calendar", href: "/calendar" },
    { icon: <Users size={20} />, label: "Users", href: "/users" },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      href: "/notifications",
    },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white dark:bg-slate-800 border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-[280px]",
      )}
    >
      {/* Logo Section */}
      <div className="h-16 border-b flex items-center justify-between px-4">
        {!isCollapsed && (
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Admin
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={onToggle}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1">
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.label} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeItem === item.label ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-all duration-200",
                    isCollapsed ? "px-2" : "px-4",
                    activeItem === item.label
                      ? "bg-secondary hover:bg-secondary/80"
                      : "hover:bg-secondary/50",
                  )}
                  onClick={() => {
                    setActiveItem(item.label);
                    navigate(item.href);
                  }}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">{item.label}</TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      {/* User Profile Section */}
      <div className="p-2 border-t">
        <TooltipProvider>
          <Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3",
                    isCollapsed ? "px-2" : "px-4",
                  )}
                >
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                    alt="User"
                    className="w-6 h-6 rounded-full"
                  />
                  {!isCollapsed && (
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">Admin User</span>
                      <span className="text-xs text-muted-foreground">
                        admin@example.com
                      </span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings2 className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isCollapsed && (
              <TooltipContent side="right" className="flex flex-col gap-1">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  admin@example.com
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
