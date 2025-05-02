'use client';

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  FormControl,
  Select,
  Button,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { UserContext } from '@/context/UserContext';

export default function BuySubscriptionPage() {
  const [plans, setPlans] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success' | 'error'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };


  const { user } = useContext(UserContext);

  const planTypes = Array.from(new Set(plans.map((p) => p.plan_type)));

  useEffect(() => {
    // Fetch plans and descriptions from API
    const fetchPlans = async () => {
      try {
        const res = await axios.get('/api/admin/plans/list');
        setPlans(res.data.plans);
        setDescriptions(res.data.descriptions);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (selectedType && selectedDuration) {
      const matchedPlan = plans.find(
        (p) => p.plan_type === selectedType && p.duration === parseInt(selectedDuration)
      );
      setPrice(matchedPlan ? matchedPlan.price : null);
    } else {
      setPrice(null);
    }
  }, [selectedType, selectedDuration, plans]);

  const handleBuy = async () => {
    console.log(selectedType, selectedDuration, price);
    
    if (!selectedType || !selectedDuration) {
      showSnackbar('Please select a plan type and duration before proceeding.', 'error');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post('/api/member/customer/add_subscription', {
        user_id: user.user_data.id,
        plan_type: selectedType,
        duration: parseInt(selectedDuration),
        price: price
      });

      console.log('Subscription bought:', res.data);

      showSnackbar(`Subscription purchased successfully!`, 'success');

      setSelectedType('');
      setSelectedDuration('');
      setPrice(null);

    } catch (error) {
      console.error('Error purchasing subscription:', error);
      if (error.response?.data?.message) {
        showSnackbar(`Failed: ${error.response.data.message}`, 'error');
      } else {
        showSnackbar('An unexpected error occurred while purchasing subscription.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };


  // Helper to convert numeric duration to string
  const formatDuration = (months) => {
    return months === 1 ? '1 Month' : `${months} Months`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>Buy Subscription</Typography>

      <Grid container spacing={4}>
        {planTypes.map((type) => (
          <Grid item xs={12} sm={6} key={type}>
            <Typography variant="h6" gutterBottom>{type}</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: '60%' }}>Duration</TableCell>
                    <TableCell sx={{ width: '40%' }}>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plans.filter((plan) => plan.plan_type === type).map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>{formatDuration(plan.duration)}</TableCell>
                      <TableCell>₹{plan.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2}>
              <Typography variant="subtitle1">
                {(descriptions.find((d) => d.plan_type === type) || {}).description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box mt={6} p={3} component={Paper}>
        <Typography variant="h5" gutterBottom>Buy Subscription</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <Select
                value={selectedType}
                displayEmpty
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setSelectedDuration('');
                }}
              >
                <MenuItem value="">Select Plan Type</MenuItem>
                {planTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth disabled={!selectedType}>
              <Select
                value={selectedDuration}
                displayEmpty
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                <MenuItem value="">Select Duration</MenuItem>
                {plans
                  .filter((plan) => plan.plan_type === selectedType)
                  .map((plan) => (
                    <MenuItem key={`${plan.id}-${plan.duration}`} value={plan.duration}>
                      {formatDuration(plan.duration)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography>{price !== null ? `₹${price}` : 'Price'}</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBuy}
              disabled={!selectedType || !selectedDuration || loading}
            >
              {loading ? 'Processing...' : 'Buy'}
            </Button>

          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Container>
  );
}
