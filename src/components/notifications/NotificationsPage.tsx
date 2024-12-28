import React from "react";
import { Bell, MessageSquare, UserPlus, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotificationsPage = () => {
  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ScrollArea className="h-[600px] rounded-md border p-4">
            {[
              {
                icon: <MessageSquare className="h-4 w-4" />,
                title: "New Message",
                description: "You have a new message from Jane Smith",
                time: "2 mins ago",
                type: "message",
              },
              {
                icon: <UserPlus className="h-4 w-4" />,
                title: "New Follower",
                description: "Bob Johnson started following you",
                time: "5 mins ago",
                type: "follow",
              },
              {
                icon: <Bell className="h-4 w-4" />,
                title: "Reminder",
                description: "Team meeting in 30 minutes",
                time: "30 mins ago",
                type: "reminder",
              },
              {
                icon: <AlertCircle className="h-4 w-4" />,
                title: "System Alert",
                description: "System maintenance scheduled for tonight",
                time: "1 hour ago",
                type: "alert",
              },
            ].map((notification, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <div
                  className={`p-2 rounded-full ${
                    notification.type === "message"
                      ? "bg-blue-100 text-blue-600"
                      : notification.type === "follow"
                        ? "bg-green-100 text-green-600"
                        : notification.type === "reminder"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                  }`}
                >
                  {notification.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
