"use client";

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {useContext} from "react";
import {UserContext} from "@/context/UserContext";


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name = "") {
  const nameParts = name.trim().split(" ").filter(Boolean);

  let initials = "";

  if (nameParts.length >= 2) {
    initials = `${nameParts[0][0]}${nameParts[1][0]}`;
  } else if (nameParts.length === 1) {
    initials = nameParts[0][0];
  } else {
    initials = "?";
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials.toUpperCase(),
  };
}


export default function AccountInfo() {
  const {user, setUser} = useContext(UserContext);
  // console.log(user);
  return (
    <Card sx={{
      borderRadius:5,
      
    }}>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar {...stringAvatar(user.user_data.name)} sx={{ height: '80px', width: '80px', fontSize: '32px' }}/>
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{user.user_data.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user.user_data.title}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
