// components/dashboard/Sidebar.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  TreePine,
  Cloud,
  Sprout,
  FileText,
  DollarSign,
  Bell,
  Zap,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar = ({
  isOpen,
  onClose,
  activeView,
  setActiveView,
}: SidebarProps) => {
  const menuItems = [
    {
      icon: User,
      label: "User Details",
      id: "user-details",
    },
    {
      icon: TreePine,
      label: "Plantation Details",
      id: "plantation-details",
    },
    {
      icon: Cloud,
      label: "Weather Info",
      id: "weather",
    },
    {
      icon: Sprout,
      label: "Samplings Allotted",
      id: "samplings",
    },
    {
      icon: FileText,
      label: "Contract Overview",
      id: "contracts",
    },
    {
      icon: DollarSign,
      label: "Credit Payments",
      id: "payments",
    },
    {
      icon: Bell,
      label: "Alerts",
      id: "alerts",
    },
    {
      icon: Zap,
      label: "Quick Actions",
      id: "actions",
    },
  ];

  return (
    <aside
      className={`bg-gray-800 text-white w-64 min-h-screen p-4 fixed transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 z-50`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">CarbonCred</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="md:hidden text-white hover:text-gray-300"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start transition-colors duration-200 hover:bg-gray-700 ${
                  activeView === item.id ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveView(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" /> {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start transition-colors duration-200 hover:bg-gray-700"
            >
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Sidebar;
