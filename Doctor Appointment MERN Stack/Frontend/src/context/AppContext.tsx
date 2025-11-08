import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type DoctorType } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

interface AppContextType {
  doctors: DoctorType[];
  currencySymbol: string;
  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;
  backendUrl: string;
  userData: UserDataType | null;
  setUserData: React.Dispatch<SetStateAction<UserDataType | null>>;
  loadUserProfileData: () => void;
  getDoctorsData: () => void;
}

interface UserDataType {
  name?: string;
  image?: string;
  email?: string;
  phone?: string;
  address?: AddressType;
  gender?: string;
  dob?: string;
}

interface AddressType {
  line1?: string;
  line2?: string;
}

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);
  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    getDoctorsData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
