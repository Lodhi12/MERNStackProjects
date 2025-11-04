import { createContext, useState, type ReactNode } from "react";

interface AdminContextProviderProps {
  children: ReactNode;
}

interface AdminContextProviderType {
  aToken: string;
  setAToken: React.Dispatch<React.SetStateAction<string>>;
  backendUrl: string;
}
export const AdminContext = createContext<AdminContextProviderType | undefined>(
  undefined
);

const AdminContextProvider = ({ children }: AdminContextProviderProps) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value = { aToken, setAToken, backendUrl };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
