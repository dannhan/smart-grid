import {
  HomeIcon,
  JoystickIcon,
  MonitorIcon,
  NewspaperIcon,
  HistoryIcon,
  SettingsIcon,
} from "lucide-react";

import type { History } from "@/types";

import Amperemeter from "@/components/Icon/Amperemeter";
import Flame from "@/components/Icon/Flame";
import Smoke from "@/components/Icon/Smoke";
import Voltmeter from "@/components/Icon/Voltmeter";

export const sidenavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/home",
    icon: HomeIcon,
  },
  {
    title: "Control",
    url: "/dashboard/control",
    icon: JoystickIcon,
  },
  {
    title: "Monitoring",
    url: "/dashboard/monitoring",
    icon: MonitorIcon,
  },
  {
    title: "Management",
    url: "/dashboard/management",
    icon: NewspaperIcon,
  },
  {
    title: "History",
    url: "/dashboard/history",
    icon: HistoryIcon,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

/* -- Below this should have dedidacted database --------------------------------------------- */

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

export const rooms = ["A", "B", "C", "D"];

export const history: History[] = [
  {
    date: "12 April 2024",
    action_type: "Repair",
    description: "Replaced broken light",
    technical_specification: "-",
    image: "",
  },
  {
    date: "15 May 2024",
    action_type: "Replacement",
    description: "Light replaced with new one brand Broco",
    technical_specification: "-",
    image: "",
  },
  {
    date: "20 Jun 2024",
    action_type: "Repair",
    description: "Cleaned regularly, no issues",
    technical_specification: "-",
    image: "",
  },
  {
    date: "01 Aug 2024",
    action_type: "Repair",
    description: "Socket A repaired due to minor damage",
    technical_specification: "-",
    image: "",
  },
  {
    date: "15 Sep 2024",
    action_type: "Replacement",
    description: "Socket replaced due to expired warranty",
    technical_specification: "-",
    image: "",
  },
];
