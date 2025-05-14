"use client"
import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BugReportIcon from '@mui/icons-material/BugReport';

import Iconify from '@/components/iconify';

import AppTasks from '../../../components/dashboard/overview/app-tasks';
import AppNewsUpdate from '../../../components/dashboard/overview/app-news-update';
import AppOrderTimeline from '../../../components/dashboard/overview/app-order-timeline';
import AppCurrentVisits from '../../../components/dashboard/overview/app-current-visits';
import AppWebsiteVisits from '../../../components/dashboard/overview/app-website-visits';
import AppWidgetSummary from '../../../components/dashboard/overview/app-widget-summary';
import AppTrafficBySite from '../../../components/dashboard/overview/app-traffic-by-site';
import AppCurrentSubject from '../../../components/dashboard/overview/app-current-subject';
import AppConversionRates from '../../../components/dashboard/overview/app-conversion-rates';
import { Grid } from '@mui/material';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useDashboardContext } from '@/context/DashboardContext';

// ----------------------------------------------------------------------



export default function AppView() {
    const [salesData, setSalesData] = useState(null);
    const [userData, setUserData] = useState(null);
    const { dashboardLoading,setDashboardLoading } = useDashboardContext();
  
    useEffect(() => {
      setDashboardLoading(true);

      axios
          .get("/api/admin/dashboard/getSalesdetail")
          .then((res) => {
              setSalesData(res.data);
          })
          .catch((err) => {
              console.error("Error fetching sales data:", err);
          });

      axios
          .get("/api/admin/dashboard/getUsersdetail")
          .then((res) => {
              setUserData(res.data);
          })
          .catch((err) => {
              console.error("Error fetching user data:", err);
          });

      setDashboardLoading(false);
  }, [dashboardLoading]);  


  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={salesData ? salesData.total_sales : 0}
            percent={salesData ? parseFloat(salesData.percentage_change) : 0}
            color="warning"
            icon={<ShoppingCartIcon sx={{ width: 32, height: 32 }} />}
            chart={{
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              series: salesData ? salesData.monthsWithData : [],
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <AppWidgetSummary
            title="New Users"
            total={userData ? userData.total_users : 0}
            percent={userData ? userData.user_percentage_change : 0}
            color="info"
            icon={<ShoppingCartIcon sx={{ width: 32, height: 32 }} />}
            chart={{
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Oct",
                "Nov",
                "Dec"
              ],
              series: userData ? userData.monthly_users : [],
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Item Orders"
            total={1723315}
            percent={2.6}
            color="warning"
            icon={<ShoppingCartIcon sx={{ width: 32, height: 32 }} />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            percent={2.6}
            icon={<BugReportIcon sx={{ width: 32, height: 32 }} />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6, lg: 8 }}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6, lg: 8 }}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid> */}

        <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
