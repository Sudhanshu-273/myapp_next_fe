'use client';

import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ProductCard from './components/product-card';
// import ProductSort from './components/product-sort';
// import ProductFilters from './components/product-filters';
// import ProductCartWidget from './components/product-cart-widget';

import { generateProducts } from '@/mocks/products';

export default function ProductsView() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const loadProducts = async () => {
      const data = await generateProducts(); 
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        {/* <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters openFilter={false} onOpenFilter={() => {}} onCloseFilter={() => {}} />
          <ProductSort />
        </Stack> */}
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ProductCard product={product}/>
          </Grid>
        ))}
      </Grid>

      {/* <ProductCartWidget /> */}
    </Container>
  );
}
