"use client";

import { useState, useRef, useEffect } from "react";
import {
  User,
  ChevronDown,
  Gauge,
  KeyRound,
  Trash,
  Smartphone,
  LogOut,
} from "lucide-react";
import { Dropdown } from "../UIComponents/Dropdown";

interface Props {
  onSwitchToEsim: () => void;
  onLogout: () => void;
  onDeleteCustomer: () => void;
  onChangePin: () => void;
  onCheckUsage: () => void;
}

export const ProfileDropdown: React.FC<Props> = ({
  onSwitchToEsim,
  onLogout,
  onDeleteCustomer,
  onChangePin,
  onCheckUsage,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="hidden lg:block">
      <Dropdown
        label={
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-700" />
          </div>
        }
        items={[
          {
            label: "Check Usage",
            icon: <Gauge size={16} />,
            onClick: onCheckUsage,
          },
          {
            label: "Change PIN",
            icon: <KeyRound size={16} />,
            onClick: onChangePin,
          },
          {
            label: "Delete Customer",
            icon: <Trash className="text-red-500" size={16} />,
            onClick: onDeleteCustomer,
          },

          {
            label: "Switch to E-sim",
            icon: <Smartphone size={16} />,
            onClick: onSwitchToEsim,
          },
          {
            label: "Logout",
            icon: <LogOut className="text-red-600" size={16} />,
            onClick: onLogout,
          },
        ]}
      />
    </div>
  );
};
