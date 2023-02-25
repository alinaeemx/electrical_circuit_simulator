
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

export const ExpSB1store = create((set) => ({
    Capacitor:
        // JSON.parse(sessionStorage.getItem('Capacitor')) ?? 
        false,
    setCapacitor: (Capacitor) => set({ Capacitor }),

    CapacityImgIdx: 0,
    setCapacityImgIdx: (CapacityImgIdx) => set({ CapacityImgIdx }),

    DCSource:
        // JSON.parse(sessionStorage.getItem('DCSource')) ??
        false,
    setDCSource: (DCSource) => set({ DCSource }),

    SingeSwitch:
        // JSON.parse(sessionStorage.getItem('SingeSwitch')) ?? 
        false,
    setSingeSwitch: (SingeSwitch) => set({ SingeSwitch }),

    Voltmeter:
        // JSON.parse(sessionStorage.getItem('Voltmeter')) ??
        false,
    setVoltmeter: (Voltmeter) => set({ Voltmeter }),

    Run: false,
    setRun: (Run) => set({ Run }),

    RunError: false,
    setRunError: (RunError) => set({ RunError }),

    switchStatus: false,
    setSwitchStatus: (switchStatus) => set({ switchStatus }),

    currentStep: 0,
    setCurrentStep: (currentStep) => set({ currentStep }),

    theVoltage: 0,
    setTheVoltage: (theVoltage) => set({ theVoltage }),

    // theCapacity: 0.05,
    // setTheCapacity: (theCapacity) => set({ theCapacity }),

    theInsulator: false,
    setTheInsulator: (theInsulator) => set({ theInsulator }),

    voltmeterValue: 0.001,
    setVoltmeterValue: (voltmeterValue) => set({ voltmeterValue }),

}));

export const ExpSB2store = create((set) => ({
    Capacitor:
        // JSON.parse(sessionStorage.getItem('Capacitor')) ?? 
        false,
    setCapacitor: (Capacitor) => set({ Capacitor }),

    DCSource:
        // JSON.parse(sessionStorage.getItem('DCSource')) ??
        false,
    setDCSource: (DCSource) => set({ DCSource }),

    DSwitch:
        // JSON.parse(sessionStorage.getItem('DSwitch')) ?? 
        false,
    setDSwitch: (DSwitch) => set({ DSwitch }),

    Lamp:
        // JSON.parse(sessionStorage.getItem('Lamp')) ??
        false,
    setLamp: (Lamp) => set({ Lamp }),

    Resistor:
        // JSON.parse(sessionStorage.getItem('Resistor')) ?? 
        false,
    setResistor: (Resistor) => set({ Resistor }),

    Galvanometer:
        // JSON.parse(sessionStorage.getItem('Galvanometer')) ??
        false,
    setGalvanometer: (Galvanometer) => set({ Galvanometer }),

    Run: false,
    setRun: (Run) => set({ Run }),

    RunError: false,
    setRunError: (RunError) => set({ RunError }),


}));

export const ExpSB3store = create((set) => ({

    SingeSwitch:
        // JSON.parse(sessionStorage.getItem('SingeSwitch')) ??
        false,
    setSingeSwitch: (SingeSwitch) => set({ SingeSwitch }),

    Galvanometer:
        // JSON.parse(sessionStorage.getItem('Galvanometer')) ??
        false,
    setGalvanometer: (Galvanometer) => set({ Galvanometer }),

    Voltmeter:
        // JSON.parse(sessionStorage.getItem('Voltmeter')) ??
        false,
    setVoltmeter: (Voltmeter) => set({ Voltmeter }),

    Inductor:
        // JSON.parse(sessionStorage.getItem('Inductor')) ??
        false,
    setInductor: (Inductor) => set({ Inductor }),

    Iron:
        // JSON.parse(sessionStorage.getItem('Iron')) ??
        false,
    setIron: (Iron) => set({ Iron }),

    ACSource:
        //  JSON.parse(sessionStorage.getItem('ACSource')) ??
        false,
    setACSource: (ACSource) => set({ ACSource }),

    Ammeter:
        // JSON.parse(sessionStorage.getItem('Ammeter')) ??
        false,
    setAmmeter: (Ammeter) => set({ Ammeter }),

    Run: false,
    setRun: (Run) => set({ Run }),

    RunError: false,
    setRunError: (RunError) => set({ RunError }),

    switchStatus: false,
    setSwitchStatus: (switchStatus) => set({ switchStatus }),

    frequency: 0,
    setFrequency: (frequency) => set({ frequency }),

    theVoltage: 0,
    setTheVoltage: (theVoltage) => set({ theVoltage }),

    theCurrent: 0,
    setTheCurrent: (theCurrent) => set({ theCurrent }),

    inductionFactor: 1,
    setInductionFactor: (inductionFactor) => set({ inductionFactor }),


}));

export const ExpSB4store = create((set) => ({

    SingeSwitch:
        // JSON.parse(sessionStorage.getItem('SingeSwitch')) ??
        false,
    setSingeSwitch: (SingeSwitch) => set({ SingeSwitch }),

    Galvanometer:
        // JSON.parse(sessionStorage.getItem('Galvanometer')) ??
        false,
    setGalvanometer: (Galvanometer) => set({ Galvanometer }),

    Voltmeter:
        // JSON.parse(sessionStorage.getItem('Voltmeter')) ??
        false,
    setVoltmeter: (Voltmeter) => set({ Voltmeter }),

    Inductor:
        // JSON.parse(sessionStorage.getItem('Inductor')) ??
        false,
    setInductor: (Inductor) => set({ Inductor }),

    Iron:
        // JSON.parse(sessionStorage.getItem('Iron')) ??
        false,
    setIron: (Iron) => set({ Iron }),

    ACSource:
        // JSON.parse(sessionStorage.getItem('ACSource')) ??
        false,
    setACSource: (ACSource) => set({ ACSource }),

    Ammeter:
        // JSON.parse(sessionStorage.getItem('Ammeter')) ?? 
        false,
    setAmmeter: (Ammeter) => set({ Ammeter }),

    Run: false,
    setRun: (Run) => set({ Run }),

    RunError: false,
    setRunError: (RunError) => set({ RunError }),

    switchStatus: false,
    setSwitchStatus: (switchStatus) => set({ switchStatus }),

    frequency: 0,
    setFrequency: (frequency) => set({ frequency }),

    theVoltage: 0,
    setTheVoltage: (theVoltage) => set({ theVoltage }),

    theCurrent: 0,
    setTheCurrent: (theCurrent) => set({ theCurrent }),

    inductionFactor: 1,
    setInductionFactor: (inductionFactor) => set({ inductionFactor }),


}));