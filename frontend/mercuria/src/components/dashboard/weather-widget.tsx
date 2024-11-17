import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, Droplets, Wind } from "lucide-react";

const WeatherWidget = () => {
  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <Sun className="mr-2 h-5 w-5 text-yellow-500" />
          Local Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <p className="text-4xl font-bold">28°C</p>
          <p className="text-muted-foreground flex items-center justify-center">
            <Cloud className="mr-2 h-5 w-5" />
            Partly Cloudy
          </p>
          <div className="flex justify-around mt-4">
            <p className="flex items-center">
              <Droplets className="mr-2 h-4 w-4 text-blue-500" />
              Humidity: 75%
            </p>
            <p className="flex items-center">
              <Wind className="mr-2 h-4 w-4 text-gray-500" />
              Wind: 5 km/h
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
