import { DocumentReference, Timestamp } from "firebase/firestore";

export type Room = {
  name: string;
  lamp: number;
  socket: number;
};

export type MetricCategory = "voltage" | "current" | "power";

export type Measurement = {
  time: string;
  value: number;
};

export type IdentifiedMeasurement = Measurement & { id: string };

export type TimeResolution = "realtime" | "hourly";

export type RawMetricsData = {
  [Category in MetricCategory as `${Category}s`]: {
    [Resolution in TimeResolution]: Record<string, Measurement> | undefined;
  };
};

export type ProcessedMetricsData = {
  [Category in MetricCategory as `${Category}s`]: {
    [Resolution in TimeResolution]: IdentifiedMeasurement[];
  };
};

// TODO: better types
export type Component =
  | {
    id: string;
    name: string;
    type: "lamp";
    properties: [
      { brand: string },
      { voltage: string },
      { power: string },
      { lumens: string },
      { "warranty-exp.": string },
    ];
  }
  | {
    id: string;
    name: string;
    type: "socket";
    properties: [
      { brand: string },
      { voltage: string },
      { "max.-current": string },
      { "warranty-exp.": string },
    ];
  }
  // TODO: complete the type
  | {
    id: string;
    name: string;
    type: "mcb" | "wire";
    properties: Record<string, string>[];
  };

export type Rooms = {
  name: string;
  componentsRef?: DocumentReference[];
  components?: Component[];
  date_created: Timestamp;
};
