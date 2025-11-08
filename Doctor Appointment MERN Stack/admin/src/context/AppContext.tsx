import { createContext, type ReactNode } from "react";

interface AppContextProviderProps {
  children: ReactNode;
}

interface AppContextType {
  slotDateFormat: (slotDate: string) => string;
  calculateAge: (dob: string) => number;
  currency: string;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate: string) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  const currency = "$";
  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };
  const value = { calculateAge, slotDateFormat, currency };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
