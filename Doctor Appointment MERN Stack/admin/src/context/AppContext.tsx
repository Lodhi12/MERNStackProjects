import { createContext, type ReactNode } from "react";

interface AppContextProviderProps {
  children: ReactNode;
}

interface AppContextType {}

const value = {};
export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
