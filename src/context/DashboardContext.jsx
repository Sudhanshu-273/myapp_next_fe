'use client';
import { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [dashboardLoading, setDashboardLoading] = useState(false);

  return (
    <DashboardContext.Provider value={{ dashboardLoading, setDashboardLoading }}>
      {children}
    </DashboardContext.Provider>
  );
};
