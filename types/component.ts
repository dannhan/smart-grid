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
        { warrantyExp: string },
      ];
    }
  | {
      id: string;
      name: string;
      type: "socket";
      properties: [
        { brand: string },
        { voltage: string },
        { maxCurrent: string },
        { warrantyExp: string },
      ];
    }
  // TODO: complete the type
  | {
      id: string;
      name: string;
      type: "mcb" | "wire";
      properties: Record<string, string>[];
    };
