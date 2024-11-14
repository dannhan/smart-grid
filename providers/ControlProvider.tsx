"use client";

import { createContext, useContext, type FC, type ReactNode } from "react";
import { ref, set } from "firebase/database";

import type { Room } from "@/types";
import { db } from "@/lib/firebase/database";
import useRealtimeObject from "@/hooks/useReatimeObject";

// Define the shape of the context
interface ControlContextType {
  rooms: Record<string, Room> | null;
  loading: boolean;
  error: string | null;
  toggleSwitch: (roomId: string, field: "lamp" | "socket") => void;
}

const ControlContext = createContext<ControlContextType | undefined>(undefined);

// Custom hook to provide easy access to the ControlContext
export const useControlContext = () => {
  const context = useContext(ControlContext);
  if (!context) {
    throw new Error("useControlContext must be used within ControlProvider");
  }
  return context;
};

// Provider component to wrap around components that need access to control data
export const ControlProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    data: rooms,
    loading,
    error,
  } = useRealtimeObject<Record<string, Room>>(db, "control");

  // Function to toggle the lamp or socket state
  const toggleSwitch = (roomId: string, field: "lamp" | "socket") => {
    if (!rooms) return;
    const roomRef = ref(db, `control/${roomId}/${field}`);
    set(roomRef, !rooms[roomId][field]); // Toggle the value in Firebase
  };

  return (
    <ControlContext.Provider value={{ rooms, loading, error, toggleSwitch }}>
      {children}
    </ControlContext.Provider>
  );
};
