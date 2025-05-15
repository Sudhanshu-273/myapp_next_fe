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
        {dashboardLoading ? (
          <div className={styles.centerLoader}>
            <LinearProgress
              color="primary"
              variant="buffer"
              value={60}
              valueBuffer={80}
              sx={{ width: '50%' }}
            />
          </div>
        ) : (
          children
        )}
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
