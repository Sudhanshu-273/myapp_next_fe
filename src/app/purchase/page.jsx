"use client";

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
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);

  const selectedItem = items.find((i) => i.name === productName);

  // Auto-update price when product selected
  const handleProductChange = (value) => {
    setProductName(value);
    const item = items.find((i) => i.name === value);
    setPrice(item ? item.price : "");
  };

  const total = price && quantity ? price * quantity : 0;

  const handleQuantityChange = (val) => {
    const num = parseInt(val);
    if (!isNaN(num) && num >= 0) setQuantity(num);
  };

  const handleSubmit = () => {
    alert(
      `Receipt Generated!\nCustomer: ${customer}\nProduct: ${productName}\nPrice: $${price}\nQuantity: ${quantity}\nTotal: $${total}`,
    );
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Purchase Page
      </Typography>

      {/* Product Name Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Product Name</InputLabel>
        <Select
          value={productName}
          label="Product Name"
          onChange={(e) => handleProductChange(e.target.value)}
        >
          {items.map((i) => (
            <MenuItem key={i.name} value={i.name}>
              {i.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Field */}
      <TextField
        label="Price"
        type="number"
        fullWidth
        margin="normal"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value) || "")}
      />

      {/* Quantity Counter */}
      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <IconButton onClick={() => setQuantity((q) => Math.max(0, q - 1))}>
          <RemoveIcon />
        </IconButton>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          sx={{ width: 120 }}
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
        disabled={!productName || !price || !quantity}
      >
        Add Purchase
      </Button>
    </Container>
  );
}
