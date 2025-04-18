"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function SalesPage() {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const selectedItem = items.find((i) => i.id === selectedProductId);
  const total = selectedItem
    ? (parseFloat(selectedItem.price) * quantity).toFixed(2)
    : "0.00";

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("/api/customer/get_customer");
        if (res.data.success) {
          setCustomers(res.data.data);
        } else {
          console.error("Failed to fetch customers:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoadingCustomers(false);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("/api/products/list");
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, []);

  const handleQuantityChange = (val) => {
    const num = parseInt(val);
    if (!isNaN(num) && num >= 0) setQuantity(num);
  };

  const handleSubmit = async () => {
    if (!selectedCustomerId || !selectedProductId || !selectedItem) return;

    try {
      const res = await axios.post("/api/sale/add", {
        customer_id: selectedCustomerId,
        product_id: selectedProductId,
        quantity,
        totalAmount: parseFloat(total),
      });

      alert("Sale submitted successfully!");
    } catch (error) {
      console.error("Error submitting sale:", error);
      alert("Failed to submit sale.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Sales Page
      </Typography>

      {/* Customer Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Customer Name</InputLabel>
        <Select
          value={selectedCustomerId}
          label="Customer Name"
          onChange={(e) => setSelectedCustomerId(e.target.value)}
          disabled={loadingCustomers}
        >
          {loadingCustomers ? (
            <MenuItem value="">
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            customers.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name} ({c.account_type_name})
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {/* Item Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Item</InputLabel>
        <Select
          value={selectedProductId}
          label="Item"
          onChange={(e) => setSelectedProductId(e.target.value)}
          disabled={loadingItems}
        >
          {loadingItems ? (
            <MenuItem value="">
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            items.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.name} - ${i.price}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {/* Quantity Counter */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <IconButton onClick={() => setQuantity((q) => Math.max(0, q - 1))}>
          <RemoveIcon />
        </IconButton>
        <TextField
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          sx={{ width: 80 }}
        />
        <IconButton onClick={() => setQuantity((q) => q + 1)}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* Total Amount */}
      <Box mt={3}>
        <Typography variant="h6">
          Total Amount: <strong>${total}</strong>
        </Typography>
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handleSubmit}
        disabled={!selectedCustomerId || !selectedProductId}
      >
        Generate Receipt
      </Button>
    </Container>
  );
}
