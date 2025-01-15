import { createContext } from "react";

export const LastRollContext = createContext({
  lastRoll: null,
  setLastRoll: (num: number) => { },
});