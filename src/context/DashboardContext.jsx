'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [salesData, setSalesData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userList, setUserList] = useState(null);

  const fetchDashboardData = () => {
    setDashboardLoading(true);

    Promise.all([
      axios.get("/api/admin/dashboard/getSalesdetail"),
      axios.get("/api/admin/dashboard/getUsersdetail"),
    ])
      .then(([salesRes, userRes]) => {
        setSalesData(salesRes.data);
        setUserData(userRes.data);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
      })
      .finally(() => {
        setDashboardLoading(false);
      });
  };

  const fetchUserList = () => {
    setDashboardLoading(true);
    axios
      .get("/api/user/list")
      .then((res) => {
        const formatted = res.data.data.map((user) => ({
          id: user.id,
          name: user.name || "-",
          email: user.email,
          phone: user.phone || "-",
          role: convertAccountType(user.account_type),
          isVerified: !!user.verified,
          status: user.account_status || "inactive",
        }));
        setUserList(formatted);
      })
      .catch((err) => {
        console.error("Error fetching user list:", err);
        toast.error("Failed to load users");
      })
      .finally(() => {
        setDashboardLoading(false);
      });
  };
  const convertAccountType = (type) => {
    switch (type) {
      case 1:
        return "admin";
      case 2:
        return "trainer";
      case 3:
        return "member";
      case 4:
        return "customer";
      default:
        return "unknown";
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchUserList();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboardLoading,
        setDashboardLoading,
        salesData,
        userData,
        fetchDashboardData,
        fetchUserList,
        userList
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
