// "use client"

import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#f5f5f5' }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            borderRadius: 2,
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h5" fontWeight={600} textAlign="center">
              Create an Account
            </Typography>

            <TextField label="Email" type="email" fullWidth />
            <TextField label="Password" type="password" fullWidth />
            <TextField label="Confirm Password" type="password" fullWidth />

            <Button variant="contained" fullWidth size="large">
              Register
            </Button>

            <Typography variant="body2" textAlign="center">
              Already have an account?{' '}
              <MuiLink component={Link} href="/login" underline="hover">
                Login
              </MuiLink>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
