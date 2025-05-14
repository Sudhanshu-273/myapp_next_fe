'use client';
import Nav from '@/components/Sidebar/Page';
import styles from '@/styles/sidebar.module.css';
import LinearProgress from '@mui/material/LinearProgress';
import { DashboardProvider, useDashboardContext } from '@/context/DashboardContext';


// Inner layout component to access context
function LayoutContent({ children }) {
  const { dashboardLoading } = useDashboardContext();

  return (
    <div className={styles.dashboardContainer}>
      <Nav />
      <main className={styles.mainContent}>
        {dashboardLoading && (
          <LinearProgress
            color="primary"
            sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}
          />
        )}
        {!dashboardLoading && children}
      </main>
    </div>
  );
}

// Main Dashboard Layout with context provider
export default function DashboardLayout({ children }) {
  return (
    <DashboardProvider>
      <LayoutContent>{children}</LayoutContent>
    </DashboardProvider>
  );
}
