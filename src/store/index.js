
import create from "zustand";

export const GlobalStore = create((set) =>
({
    volt: '0.00 v',
    setVolt: (volt) => set({ volt }),

    // onLed: 'bulb',
    // setOnLed: (onLed) => set({ onLed }),

    onSwitchKey: () => { },
    setOnSwitchKey: (onSwitchKey) => set({ onSwitchKey }),
}))