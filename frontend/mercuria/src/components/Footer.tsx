import { Separator } from "@/components/ui/separator";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-8 text-center">
      <Separator className="my-4 max-w-4xl mx-auto" />
      <p>&copy; 2024 Payment Gateway. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-4">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Support</a>
        <a href="#" className="hover:text-white">Contact Us</a>
      </div>
    </footer>
  );
};
