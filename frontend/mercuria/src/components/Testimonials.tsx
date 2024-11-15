import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface Testimonial {
  name: string;
  feedback: string;
}

const testimonials: Testimonial[] = [
  { name: "John Doe", feedback: "Amazing service! Fast and reliable." },
  { name: "Jane Smith", feedback: "Highly secure and easy to integrate." },
  { name: "Mike Johnson", feedback: "A must-have for our business." },
];

export const Testimonials: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{testimonial.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{testimonial.feedback}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
