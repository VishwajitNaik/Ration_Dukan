import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FileText,
  Download,
  Settings,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Ration Cards",
    href: "/ration-cards",
    icon: Users,
  },
  {
    label: "Stock",
    href: "/stock",
    icon: Package,
  },
  {
    label: "Distribution",
    href: "/distribution",
    icon: ShoppingCart,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    label: "Exports",
    href: "/exports",
    icon: Download,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default navigation;