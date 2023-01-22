
import {create} from "zustand";

export const GlobalStore = create((set) =>
({
    volt: '0.00 v',
    setVolt: (volt) => set({ volt }),

    // onLed: 'bulb',
    // setOnLed: (onLed) => set({ onLed }),

    onSwitchKey: () => { },
    setOnSwitchKey: (onSwitchKey) => set({ onSwitchKey }),
}))

export const ExpSB1store = create((set) => ({
    Capacitor: false,
    setCapacitor: (Capacitor) => set({ Capacitor }),
  
    DCSource: false,
    setDCSource: (DCSource) => set({ DCSource }),
  
    DSwitch: false,
    setDSwitch: (DSwitch) => set({ DSwitch }),
  
    Lamp: false,
    setLamp: (Lamp) => set({ Lamp }),
  
    Resistor: false,
    setResistor: (Resistor) => set({ Resistor }),

    Galvanometer: false,
    setGalvanometer: (Galvanometer) => set({ Galvanometer }),
  
    Run: false,
    setRun: (Run) => set({ Run }),
  
  }));