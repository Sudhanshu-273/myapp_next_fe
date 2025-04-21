// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Box,
//   Button,
//   TextField,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";

// export default function SalesPage() {
//   const [items, setItems] = useState([]); // stores products
//   const [productName, setProductName] = useState(""); 
//   const [productId, setProductId] = useState("");
//   const [price, setPrice] = useState("");
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   const selectedItem = items.find((i) => i.id === productName);
//   const total = selectedItem
//     ? (parseFloat(selectedItem.price) * quantity).toFixed(2)
//     : "0.00";

//   // Fetch product list on mount
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("/api/purchases/getProduct");
//         if (res.data.success && Array.isArray(res.data.data)) {
//           setItems(res.data.data);
//           console.log("Products fetched:", res.data.data);
//         } else {
//           console.error("Failed to fetch products:", res.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoadingProducts(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Auto-update price when product changes
//   const handleProductChange = (value) => {
//     console.log("value", value);
//     setProductName(value);
//     const selected = items.find((i) => i.id === value);
//     setPrice(selected ? selected.price : "");
//   };

//   const handleQuantityChange = (val) => {
//     const num = parseInt(val);
//     if (!isNaN(num) && num >= 0) setQuantity(num);
//   };

//   const handleSubmit = async () => {
//     if (!productId || !price || !quantity) {
//       alert("Please fill all fields correctly.");
//       return;
//     }
//     try {
//       const res = await axios.post("/api/purchases/add", {
//         product_id: id,
//         quantity,
//         price: price,
//         totalAmount: parseFloat(total),
//       });

//       if (res.data.success) {
//         alert("Purchase added successfully!");
//         setProductName("");
//         setPrice("");
//         setQuantity(1);
//       } else {
//         alert("Failed to add purchase.");
//       }
//     } catch (error) {
//       console.error("Error submitting sale:", error);
//       alert("Failed to submit sale.");
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Purchase Page
//       </Typography>

//       {/* Product Dropdown */}
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Product Name</InputLabel>
//         <Select
//           value={productName || ""}
//           label="Product Name"
//           onChange={(e) => handleProductChange(e.target.value)}
//         >
//           {loadingProducts ? (
//             <MenuItem value="">
//               <CircularProgress size={24} />
//             </MenuItem>
//           ) : (
//             items.map((product) => (
              
//               <MenuItem key={product.id} value={product.id}>
//                 {product.name}
//               </MenuItem>
//             ))
//           )}
//         </Select>
//       </FormControl>

//       {/* Price */}
//       <TextField
//         label="Price"
//         type="number"
//         fullWidth
//         margin="normal"
//         value={price}
//         onChange={(e) => setPrice(parseFloat(e.target.value) || "")}
//       />

//       {/* Quantity */}
//       <Box display="flex" alignItems="center" gap={2} mt={2}>
//         <IconButton onClick={() => setQuantity((q) => Math.max(0, q - 1))}>
//           <RemoveIcon />
//         </IconButton>
//         <TextField
//           label="Quantity"
//           type="number"
//           value={quantity}
//           onChange={(e) => handleQuantityChange(e.target.value)}
//           inputProps={{ min: 0, style: { textAlign: "center" } }}
//           sx={{ width: 120 }}
//         />
//         <IconButton onClick={() => setQuantity((q) => q + 1)}>
//           <AddIcon />
//         </IconButton>
//       </Box>

//       {/* Total */}
//       <Box mt={3}>
//         <Typography variant="h6">
//           Total Amount: <strong>₹{total}</strong>
//         </Typography>
//       </Box>

//       {/* Submit */}
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         sx={{ mt: 4 }}
//         onClick={handleSubmit}
//         disabled={!productName || !price || quantity <= 0}
//       >
//         Add Purchase
//       </Button>
//     </Container>
//   );
// }

"use client";

import { useEffect, useState } from "react";
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

export default function PurchasePage() {
  const [items, setItems] = useState([]); // All products
  const [selectedProductId, setSelectedProductId] = useState(""); // Selected product ID
  const [price, setPrice] = useState(""); // Product price
  const [quantity, setQuantity] = useState(1); // Quantity
  const [loadingProducts, setLoadingProducts] = useState(true); // Loading state

  // Find selected item
  const selectedItem = items.find((i) => i.id === selectedProductId);
  const total = selectedItem
    ? (parseFloat(price || 0) * quantity).toFixed(2)
    : "0.00";
  console.log("Total:", total);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/purchases/getProduct");
        if (res.data.success && Array.isArray(res.data.data)) {
          setItems(res.data.data);
        } else {
          console.error("Failed to fetch products:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // On product change
  const handleProductChange = (productId) => {
    setSelectedProductId(productId);
    const selected = items.find((i) => i.id === productId);
    setPrice(selected?.price || "");
  };

  const handleQuantityChange = (val) => {
    const num = parseInt(val);
    if (!isNaN(num) && num >= 0) setQuantity(num);
  };

  const handleSubmit = async () => {
    console.log(selectedProductId, price, quantity, total);
    if (!selectedProductId || !price || !quantity) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      const res = await axios.post("/api/purchases/add", {
        product_id: selectedProductId,
        quantity:quantity,
        price: parseFloat(price),
        total_amount: (total),
      });
      
console.log("Response:", res.data);
      if (res.data) {
        alert("Purchase added successfully!");
        setSelectedProductId("");
        setPrice("");
        setQuantity(1);
      } else {
        alert("Failed to add purchase.");
      }
    } catch (error) {
      console.error("Error submitting purchase:", error);
      alert("Failed to submit purchase.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Purchase Page
      </Typography>

      {/* Product Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Product Name</InputLabel>
        <Select
          value={selectedProductId}
          label="Product Name"
          onChange={(e) => handleProductChange(e.target.value)}
          disabled={loadingProducts}
        >
          {loadingProducts ? (
            <MenuItem value="">
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            items.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {/* Price */}
      <TextField
        label="Price"
        type="number"
        fullWidth
        margin="normal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* Quantity Selector */}
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
          Total Amount: <strong>₹{total}</strong>
        </Typography>
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 4 }}
        onClick={handleSubmit}
        disabled={!selectedProductId || !price || quantity <= 0}
      >
        Add Purchase
      </Button>
    </Container>
  );
}
