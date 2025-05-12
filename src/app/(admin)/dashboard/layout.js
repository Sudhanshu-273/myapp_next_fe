
import Nav from '@/components/Sidebar/Page'
import styles from '@/styles/sidebar.module.css'

export const metadata = {
  title: 'Dashboard',
}

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardContainer}>
      <Nav />
      <main className={styles.mainContent}>{children}</main>
    </div>
  )
}
