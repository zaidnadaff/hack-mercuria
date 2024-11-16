import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, DollarSign } from "lucide-react";

const ContractOverview = () => {
  const contractDetails = [
    { icon: FileText, label: "Contract ID", value: "PLT-2023-001" },
    { icon: Calendar, label: "Duration", value: "5 years (2023-2028)" },
    { icon: DollarSign, label: "Total Value", value: "$10,000,000" },
  ];

  const keyTerms = [
    "Annual yield target: 50,000 tons",
    "Sustainability compliance required",
    "Quarterly quality inspections",
  ];

  const badges = ["Active", "Renewable", "Performance-based"];

  return (
    <Card className="col-span-full lg:col-span-2 transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Contract Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contractDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center justify-between transition-all duration-200 hover:bg-gray-100 p-2 rounded-md"
            >
              <div className="flex items-center space-x-2">
                <detail.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg font-medium">{detail.label}:</span>
              </div>
              <span className="text-lg">{detail.value}</span>
            </div>
          ))}
          <div className="pt-4">
            <h4 className="text-lg font-medium mb-2">Key Terms:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {keyTerms.map((term, index) => (
                <li
                  key={index}
                  className="transition-all duration-200 hover:text-primary"
                >
                  {term}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="outline"
                className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractOverview;
