import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {[
              {
                title: "Team Meeting",
                time: "10:00 AM",
                duration: "1h",
                attendees: 5,
              },
              {
                title: "Project Review",
                time: "2:00 PM",
                duration: "2h",
                attendees: 3,
              },
              {
                title: "Client Call",
                time: "4:00 PM",
                duration: "30m",
                attendees: 2,
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.time} • {event.duration}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {event.attendees} attendees
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
