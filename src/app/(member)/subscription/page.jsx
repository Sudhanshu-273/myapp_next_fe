'use client';

import { useEffect, useState } from 'react';
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
} from '@mui/material';

export default function BuySubscriptionPage() {
  const [plans, setPlans] = useState([
    { id: 1, title: 'Basic Silver', duration: '1 Month', price: 199, active: true, plan_type: 'Basic' },
    { id: 2, title: 'Basic Gold', duration: '3 Months', price: 499, active: true, plan_type: 'Basic' },
    { id: 3, title: 'Premium Silver', duration: '1 Month', price: 399, active: true, plan_type: 'Premium' },
    { id: 4, title: 'Premium Gold', duration: '6 Months', price: 1999, active: true, plan_type: 'Premium' },
    { id: 5, title: 'Enterprise Starter', duration: '1 Month', price: 999, active: true, plan_type: 'Enterprise' },
    { id: 6, title: 'Enterprise Pro', duration: '12 Months', price: 9999, active: true, plan_type: 'Enterprise' },
    { id: 7, title: 'Enterprise Pro', duration: '12 Months', price: 9999, active: true, plan_type: 'Enterpriss' },
    { id: 8, title: 'Enterprise Pro', duration: '12 Months', price: 9999, active: true, plan_type: 'Enterpiss' },
    { id: 9, title: 'Enterprise Pro', duration: '12 Months', price: 9999, active: true, plan_type: 'Entepriss' },
  ]);

  const [descriptions, setDescriptions] = useState([
    { plan_type: 'Basic', description: 'Basic plan suitable for individuals.' },
    { plan_type: 'Premium', description: 'Premium plan with added benefits.' },
    { plan_type: 'Enterprise', description: 'Enterprise plan for businesses and teams.' },
    { plan_type: 'Enterprss', description: 'Enterprise plan for businesses and teams.' },
    { plan_type: 'Enterpiss', description: 'Enterprise plan for businesses and teams.' },
    { plan_type: 'Entepriss', description: 'Enterprise plan for businesses and teams.' },
  ]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [price, setPrice] = useState(null);
  const planTypes = Array.from(new Set(plans.map((p) => p.plan_type)));

  useEffect(() => {
    if (selectedType && selectedDuration) {
      const matchedPlan = plans.find(
        (p) => p.plan_type === selectedType && p.duration === selectedDuration
      );
      setPrice(matchedPlan ? matchedPlan.price : null);
    } else {
      setPrice(null);
    }
  }, [selectedType, selectedDuration, plans]);

  const handleBuy = () => {
    if (!selectedType || !selectedDuration) return;
    alert(`Subscription purchased successfully!\n\nPlan: ${selectedType}\nDuration: ${selectedDuration}\nPrice: ₹${price}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>Buy Subscription</Typography>

      <Grid container spacing={4}>
        {planTypes.map((type, index) => (
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
                      <TableCell>{plan.duration}</TableCell>
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
                      {plan.duration}
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
              disabled={!selectedType || !selectedDuration}
            >
              Buy
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>

  );
}
