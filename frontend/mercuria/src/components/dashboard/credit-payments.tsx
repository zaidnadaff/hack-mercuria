import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreditPayments = () => {
  const upcomingPayments = [
    { id: 3, date: "2023-07-15", amount: 50000, status: "Pending" },
    { id: 4, date: "2023-08-15", amount: 50000, status: "Upcoming" },
  ];

  const pastPayments = [
    { id: 1, date: "2023-05-15", amount: 50000, status: "Paid" },
    { id: 2, date: "2023-06-15", amount: 50000, status: "Paid" },
  ];

  return (
    <Card className="col-span-full transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Credit Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingPayments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="transition-all duration-200 hover:bg-gray-100"
                  >
                    <TableCell className="font-medium">#{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === "Pending" ? "warning" : "secondary"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                      >
                        Request Early Payment
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="past">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastPayments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="transition-all duration-200 hover:bg-gray-100"
                  >
                    <TableCell className="font-medium">#{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="success">{payment.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CreditPayments;
