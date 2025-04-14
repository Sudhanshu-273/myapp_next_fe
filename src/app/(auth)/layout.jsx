'use client';

import { CssBaseline } from '@mui/material';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <main>{children}</main>
      </body>
    </html>
  );
}
