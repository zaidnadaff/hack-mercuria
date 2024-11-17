import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, TreePine } from "lucide-react";

const QuickActions = () => {
  const actions = [
    { icon: FileText, label: "Generate Report" },
    { icon: Users, label: "Schedule Inspection" },
    { icon: TreePine, label: "Order Supplies" },
  ];

  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              className="w-full transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
            >
              <action.icon className="mr-2 h-4 w-4" /> {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
