"use client";

import { useState, useEffect, useContext } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "@/context/UserContext";

export default function SalesPage() {
  const { user } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [saleItems, setSaleItems] = useState([
    { productId: "", quantity: 1, price: 0 },
  ]);

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

  const handleItemChange = (index, field, value) => {
    const updatedSaleItems = [...saleItems];
    updatedSaleItems[index][field] = value;

    // if productId changes, also update the price
    if (field === "productId") {
      const selectedItem = items.find((i) => i.id === value);
      updatedSaleItems[index].price = selectedItem ? parseFloat(selectedItem.price) : 0;
    }

    setSaleItems(updatedSaleItems);
  };

  const addSaleItem = () => {
    setSaleItems([...saleItems, { productId: "", quantity: 1, price: 0 }]);
  };

  const removeSaleItem = (index) => {
    const updatedSaleItems = saleItems.filter((_, i) => i !== index);
    setSaleItems(updatedSaleItems);
  };

  const calculateTotal = () => {
    return saleItems.reduce((total, item) => {
      total += item.price * item.quantity;
      return total;
    }, 0).toFixed(2);
  };

  const handleSubmit = async () => {
    // console.log("Details:", saleItems, user, calculateTotal());
    try {
      await axios.post("/api/sale/add", {
        user_id: user.user_data.id,
        items: saleItems.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: parseFloat(calculateTotal()),
      });

      alert("Sale submitted successfully!");
      setSaleItems([{ productId: "", quantity: 1, price: 0 }]);
    } catch (error) {
      console.error("Error submitting sale:", error);
      alert("Failed to submit sale.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Place Order
      </Typography>

      {saleItems.map((item, index) => (
        <Box key={index} display="flex" alignItems="center" gap={2} mt={2}>
          <FormControl fullWidth>
            <InputLabel>Item</InputLabel>
            <Select
              value={item.productId}
              label="Item"
              onChange={(e) => handleItemChange(index, "productId", e.target.value)}
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

          <TextField
            type="number"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, "quantity", Math.max(1, parseInt(e.target.value) || 1))}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
            sx={{ width: 80 }}
          />

          <Typography sx={{ minWidth: 70 }} textAlign="center">
            ${item.price.toFixed(2)}
          </Typography>

          <IconButton onClick={() => removeSaleItem(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addSaleItem}
        sx={{ mt: 2 }}
      >
        Add Item
      </Button>

      <Box mt={3}>
        <Typography variant="h6">
          Total Amount: <strong>${calculateTotal()}</strong>
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handleSubmit}
        disabled={saleItems.some((item) => !item.productId)}
      >
        Generate Receipt
      </Button>
    </Container>
  );
}
