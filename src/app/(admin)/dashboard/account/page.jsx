import React from "react";
import {Grid,Box} from "@mui/material";
import AccountForm from "@/components/dashboard/account/accountForm";
import AccountInfo from "@/components/dashboard/account/accountInfo";


export default function Page() {
  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <AccountInfo />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 8 }}>
            <AccountForm />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
