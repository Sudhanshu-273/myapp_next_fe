"use client";
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { fNumber, fPercent, fShortenNumber } from '@/utils/format-number';
import { varAlpha } from 'minimal-shared/utils';

import Iconify from '@/components/iconify';
import SvgColor from '@/components/svg-color';
import Chart, { useChart } from '@/components/chart';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({
  sx,
  icon,
  title,
  total,
  chart,
  percent,
  color = 'primary',
  ...other
}) {
  const theme = useTheme();

  const chartColors = [theme.palette[color].dark];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    xaxis: { categories: chart.categories },
    grid: {
      padding: {
        top: 6,
        left: 6,
        right: 6,
        bottom: 6,
      },
    },
    tooltip: {
      y: { formatter: (value) => fNumber(value), title: { formatter: () => '' } },
    },
    markers: {
      strokeWidth: 0,
    },
    ...chart.options,
  });

  const renderTrending = () => (
    <Box
      sx={{
        top: 12,
        gap: 0.5,
        right: 12,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
      }}
    >
      <Iconify
        width={18}
        icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
      />
      <Box component="span" sx={{ typography: 'caption', fontSize: 12 }}>
        {percent > 0 && '+'}
        {fPercent(percent)}
      </Box>
    </Box>
  );

  return (
    <Card
      sx={[
        () => ({
          p: 2,
          boxShadow: 'none',
          position: 'relative',
          color: `${color}.darker`,
          backgroundColor: 'common.white',
          backgroundImage: `linear-gradient(135deg, ${alpha(
            theme.palette[color].lighter,
            0.48
          )}, ${alpha(theme.palette[color].light, 0.48)})`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ width: 40, height: 40, mb: 2 }}>{icon}</Box>

      {renderTrending()}

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        <Box sx={{ flexGrow: 1, minWidth: 100 }}>
          <Box sx={{ mb: 0.5, typography: 'subtitle2', fontSize: 12 }}>{title}</Box>
          <Box sx={{ typography: 'h5', fontSize: 14 }}>{fShortenNumber(total)}</Box>
        </Box>

        <Chart
          type="line"
          series={[{ data: chart.series }]}
          options={chartOptions}
          sx={{ width: 72, height: 48 }}
        />
      </Box>

      <SvgColor
        src="/assets/background/shape-square.svg"
        sx={{
          top: 0,
          left: -20,
          width: 200,
          zIndex: -1,
          height: 200,
          opacity: 0.2,
          position: 'absolute',
          color: `${color}.main`,
        }}
      />
    </Card>
  );
}
