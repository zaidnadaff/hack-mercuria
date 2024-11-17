import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle } from "lucide-react";

const Alerts = () => {
  const alerts = [
    {
      type: "Weather",
      message: "Heavy rain expected in the next 48 hours.",
      color: "text-yellow-500",
    },
    {
      type: "Pest Detection",
      message: "Possible pest infestation in Sector B.",
      color: "text-red-500",
    },
    {
      type: "Maintenance",
      message: "Schedule equipment maintenance for next week.",
      color: "text-blue-500",
    },
  ];

  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 rounded-md border p-4 transition-all duration-200 hover:bg-gray-100"
              >
                <AlertTriangle className={`h-5 w-5 ${alert.color}`} />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {alert.type}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Alerts;
