import React, { createContext } from "react";

export const CragContext = createContext({
  cragState: {
    id: "",
    name: "",
    description: "",
    conditions: "",
    gear: "",
    longitude: "",
    latitude: "",
  },
  setCragState: () => {},
});
