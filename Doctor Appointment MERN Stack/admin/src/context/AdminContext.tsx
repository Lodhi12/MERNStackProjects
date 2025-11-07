import axios from "axios";
import { createContext, useState, type ReactNode } from "react";
import { toast } from "react-toastify";

interface AdminContextProviderProps {
  children: ReactNode;
}

export interface DoctorType {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: AddressType;
}

export interface AddressType {
  line1: string;
  line2: string;
}

interface AdminContextProviderType {
  aToken: string | null;
  setAToken: React.Dispatch<React.SetStateAction<string | null>>;
  backendUrl: string;
  doctors: DoctorType[];
  getAllDoctors: () => void;
  changeAvailability: () => void;
}
export const AdminContext = createContext<AdminContextProviderType | undefined>(
  undefined
);

const AdminContextProvider = ({ children }: AdminContextProviderProps) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [doctors, setDoctors] = useState<DoctorType[]>([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
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

  const changeAvailability = async (docId: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + `/api/admin/change-availability`,
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else [toast.error(data.message)];
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
