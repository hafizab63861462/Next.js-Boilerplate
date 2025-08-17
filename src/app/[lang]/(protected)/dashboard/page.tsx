"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to home or login
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to your dashboard!
        </Typography>

        <Grid container spacing={3}>
          {/* Dummy Widget 1 */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Statistics</Typography>
              <Typography variant="body2">Users: 1,234</Typography>
            </Paper>
          </Grid>

          {/* Dummy Widget 2 */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="body2">$12,345</Typography>
            </Paper>
          </Grid>

          {/* Dummy Widget 3 */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Tasks</Typography>
              <Typography variant="body2">Complete: 42</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
