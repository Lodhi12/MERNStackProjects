import { createContext, type ReactNode } from "react";
import { doctors, type DoctorType } from "../assets/assets";

interface AppContextType {
  doctors: DoctorType[];
  currencySymbol: string;
}

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const currencySymbol = "$";
  const value = {
    doctors,
    currencySymbol,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
