import axios from "axios";
import {
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import { toast } from "react-toastify";

interface DoctorContextType {
  dToken: string | null;
  setDToken: React.Dispatch<SetStateAction<string | null>>;
  backendUrl: string;
  appointments: AppointmentType[];
  setAppointments: React.Dispatch<SetStateAction<AppointmentType[]>>;
  getAppointments: () => void;
  cancelAppointment: (appointmentId: string) => void;
  completeAppointment: (appointmentId: string) => void;
  dashData: DashboardDataType | null;
  setDashData: React.Dispatch<SetStateAction<DashboardDataType | null>>;
  getDashData: () => void;
  profileData: ProfileDataType | undefined;
  setProfileData: React.Dispatch<SetStateAction<ProfileDataType | undefined>>;
  getProfileData: () => void;
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

interface DashboardDataType {
  appointments: number;
  earnings: number;
  latestAppointments: AppointmentType[];
  patients: number;
}

interface ProfileDataType {
  about: string;
  address: AddressType;
  available: boolean;
  date: number;
  degree: string;
  email: string;
  experience: string;
  fees: number;
  image: string;
  name: string;
  slots_booked: string;
  speciality: string;
  __v: number;
  _id: string;
}

interface DoctorContextProps {
  children: ReactNode;
}

export const DoctorContext = createContext<DoctorContextType | undefined>(
  undefined
);

const DoctorContextProvider = ({ children }: DoctorContextProps) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState<string | null>(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [dashData, setDashData] = useState<DashboardDataType | null>(null);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [profileData, setProfileData] = useState<ProfileDataType | undefined>(
    undefined
  );
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
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

  const completeAppointment = async (appointmentId: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
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
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
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

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });
      if (data.success) {
        setProfileData(data.profileData);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };
  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
