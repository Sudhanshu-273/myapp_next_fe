import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from '@/utils/format-number';

import Label from '@/components/label';
import { ColorPreview } from '@/components/color-utils';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 8,
        left: 8,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.cover}
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 1,
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      {product.priceSale && (
        <Typography
          component="span"
          variant="body2"
          sx={{
            color: 'text.disabled',
            textDecoration: 'line-through',
            mr: 0.5,
          }}
        >
          {fCurrency(product.priceSale)}
        </Typography>
      )}
      {fCurrency(product.price)}
    </Typography>
  );

  return (
    <Card>
      {/* Fixed image height box */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 250, // fixed height for all images
          overflow: 'hidden',
        }}
      >
        {product.status && renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={product.colors} />
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
