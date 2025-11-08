import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const adminContext = useContext(AdminContext);
  if (!adminContext) {
    throw new Error("Nothing in admin context");
  }

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, []);
  const { aToken, getDashData, cancelAppointment, dashData } = adminContext;
  return <div>Dashboard</div>;
};

export default Dashboard;
