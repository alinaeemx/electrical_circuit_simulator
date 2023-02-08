
import { create } from "zustand";

export const GlobalStore = create((set) =>
({
    volt: '0.00 v',
    setVolt: (volt) => set({ volt }),

    // onLed: 'bulb',
    // setOnLed: (onLed) => set({ onLed }),

    onSwitchKey: () => { },
    setOnSwitchKey: (onSwitchKey) => set({ onSwitchKey }),
}))

export const ExpSB2store = create((set) => ({
    Capacitor: JSON.parse(sessionStorage.getItem('Capacitor')) ?? false,
    setCapacitor: (Capacitor) => set({ Capacitor }),

    DCSource: JSON.parse(sessionStorage.getItem('DCSource')) ?? false,
    setDCSource: (DCSource) => set({ DCSource }),

    DSwitch: JSON.parse(sessionStorage.getItem('DSwitch')) ?? false,
    setDSwitch: (DSwitch) => set({ DSwitch }),

    Lamp: JSON.parse(sessionStorage.getItem('Lamp')) ?? false,
    setLamp: (Lamp) => set({ Lamp }),

    Resistor: JSON.parse(sessionStorage.getItem('Resistor')) ?? false,
    setResistor: (Resistor) => set({ Resistor }),

    Galvanometer: JSON.parse(sessionStorage.getItem('Galvanometer')) ?? false,
    setGalvanometer: (Galvanometer) => set({ Galvanometer }),

    Run: false,
    setRun: (Run) => set({ Run }),

    RunError: false,
    setRunError: (RunError) => set({ RunError }),


}));