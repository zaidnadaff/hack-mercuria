import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, TreePine } from "lucide-react";

const PlantationDetails = () => {
  return (
    <Card className="col-span-full lg:col-span-2 transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Plantation Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: MapPin, label: "Location", value: "Sumatra, Indonesia" },
            { icon: Calendar, label: "Established", value: "2015" },
            { icon: Users, label: "Employees", value: "250" },
            { icon: TreePine, label: "Total Area", value: "5000 hectares" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 transition-all duration-200 hover:bg-gray-100 p-2 rounded-md"
            >
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg">
                <span className="font-medium">{item.label}:</span> {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Palm Oil", "Sustainable", "RSPO Certified", "Organic"].map(
            (badge, index) => (
              <Badge
                key={index}
                className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                {badge}
              </Badge>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantationDetails;
