import { createContext, type ReactNode } from "react";

interface DocumentContextType {}

interface DocumentContextProps {
  children: ReactNode;
}

export const DoctorContext = createContext<DocumentContextType | undefined>(
  undefined
);

const DoctorContextProvider = ({ children }: DocumentContextProps) => {
  const value = {};

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
