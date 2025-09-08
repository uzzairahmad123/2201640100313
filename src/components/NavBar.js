import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const { pathname } = useLocation();
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">URL Shortener</Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={Link} to="/" disabled={pathname==='/'}>
            Shorten
          </Button>
          <Button color="inherit" component={Link} to="/analytics" disabled={pathname==='/analytics'}>
            Analytics
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
