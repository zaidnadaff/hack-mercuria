import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SamplingsAllotted = () => {
  const samplings = [
    { name: "Oil Palm", allotted: 10000, planted: 8500 },
    { name: "Rubber", allotted: 5000, planted: 4200 },
    { name: "Cocoa", allotted: 3000, planted: 2800 },
  ];

  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Samplings Allotted</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {samplings.map((sampling) => (
            <div key={sampling.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{sampling.name}</span>
                <span className="text-muted-foreground">
                  {sampling.planted} / {sampling.allotted}
                </span>
              </div>
              <Progress
                value={(sampling.planted / sampling.allotted) * 100}
                className="h-2 w-full transition-all duration-300 ease-in-out hover:h-3"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SamplingsAllotted;
