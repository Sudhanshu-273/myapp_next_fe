"use client";

// pages/sales.js
import { useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const customers = [
  "John Doe(Trainer)",
  "Jane Smith(Member)",
  "Alice Johnson(Member)",
];
const items = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Tablet", price: 300 },
];

export default function SalesPage() {
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  const selectedItem = items.find((i) => i.name === item);
  const total = selectedItem ? selectedItem.price * quantity : 0;

  const handleQuantityChange = (val) => {
    const num = parseInt(val);
    if (!isNaN(num) && num >= 0) setQuantity(num);
  };

  const handleSubmit = () => {
    alert(
      `Receipt Generated!\nCustomer: ${customer}\nItem: ${item}\nQuantity: ${quantity}\nTotal: $${total}`
    );
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
          value={customer}
          label="Customer Name"
          onChange={(e) => setCustomer(e.target.value)}
        >
          {customers.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Item Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Item Name</InputLabel>
        <Select
          value={item}
          label="Item Name"
          onChange={(e) => setItem(e.target.value)}
        >
          {items.map((i) => (
            <MenuItem key={i.name} value={i.name}>
              {i.name} - ${i.price}
            </MenuItem>
          ))}
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
        disabled={!customer || !item}
      >
        Generate Receipt
      </Button>
    </Container>
  );
}
