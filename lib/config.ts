import { Home, Joystick, Monitor, Newspaper, History } from "lucide-react";

import Amperemeter from "@/components/Icon/Amperemeter";
import Flame from "@/components/Icon/Flame";
import Smoke from "@/components/Icon/Smoke";
import Voltmeter from "@/components/Icon/Voltmeter";

export const sidenavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/home",
    icon: Home,
  },
  {
    title: "Control",
    url: "/dashboard/control",
    icon: Joystick,
  },
  {
    title: "Monitoring",
    url: "/dashboard/monitoring",
    icon: Monitor,
  },
  {
    title: "Management",
    url: "/dashboard/management",
    icon: Newspaper,
  },
  {
    title: "History",
    url: "/dashboard/history",
    icon: History,
  },
];

// TODO: href
export const dashboardInfoItems = [
  {
    title: "Voltage",
    value: "200",
    unit: "Volts",
    icon: Voltmeter,
  },
  {
    title: "Smoke",
    value: "No Smoke",
    unit: "Secure",
    icon: Smoke,
  },
  {
    title: "Current",
    value: "≈30",
    unit: "Ampere",
    icon: Amperemeter,
  },
  {
    title: "Flame",
    value: "No Flame",
    unit: "Secure",
    icon: Flame,
  },
];
