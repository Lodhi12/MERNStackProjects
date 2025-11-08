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
  available: boolean;
  slots_booked: Object;
}

export interface AddressType {
  line1: string;
  line2: string;
}

interface UserDataType {
  name: string;
  image: string;
  email: string;
  phone: string;
  address: AddressType;
  gender: string;
  dob: string;
}

interface AppointmentType {
  amount: number;
  cancelled: boolean;
  date: Date;
  docData: DoctorType;
  docId: string;
  isCompleted: boolean;
  payment: boolean;
  slotDate: string;
  slotTime: string;
  userData: UserDataType;
  userId: string;
  __V: number;
  _id: string;
}

interface AdminContextProviderType {
  aToken: string | null;
  setAToken: React.Dispatch<React.SetStateAction<string | null>>;
  backendUrl: string;
  doctors: DoctorType[];
  getAllDoctors: () => void;
  changeAvailability: (docId: string) => void;
  appointments: AppointmentType[];
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentType[]>>;
  getAllAppointments: () => void;
  cancelAppointment: (appointmentId: string) => void;
  getDashData: () => void;
}
export const AdminContext = createContext<AdminContextProviderType | undefined>(
  undefined
);

const AdminContextProvider = ({ children }: AdminContextProviderProps) => {
  const [aToken, setAToken] = useState<string | null>(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [dashData, setDashData] = useState([]);
  const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

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
      } else toast.error(data.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    getAllAppointments,
    appointments,
    setAppointments,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
