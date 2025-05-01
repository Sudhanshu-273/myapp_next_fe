'use client';

import {CssBaseline} from '@mui/material';

export default function RootLayout({children}) {
    return (
        <>
            <CssBaseline/>
            <main>{children}</main>
        </>
    );
}
