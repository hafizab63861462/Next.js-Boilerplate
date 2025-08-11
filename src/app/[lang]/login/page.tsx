"use client"; // ← This is required!

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(6),
  borderRadius: "8px",
  maxWidth: "400px",
  width: "100%",
  margin: "auto",
  marginTop: "100px",
}));

const StyledButton = styled(Button)(() => ({
  width: "100%",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  padding: "10px 0",
}));

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <StyledPaper>
        <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
          Sign in
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Welcome back! Please sign in to continue.
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              height: 40,
            },
            "& .MuiInputLabel-root": {
              transform: "translate(14px, 8px) scale(1)", // Adjust label position
              fontSize: "14px",
            },
            "& .MuiInputLabel-shrink": {
              transform: "translate(14px, -6px) scale(0.75)", // Label when focused/filled
            },
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              height: 40,
            },
            "& .MuiInputLabel-root": {
              transform: "translate(14px, 8px) scale(1)", // Adjust label position
              fontSize: "14px",
            },
            "& .MuiInputLabel-shrink": {
              transform: "translate(14px, -6px) scale(0.75)", // Label when focused/filled
            },
          }}
        />

        <StyledButton
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#2F3037",
            height: 40,
            padding: "6px 0",
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "none",
            borderRadius: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            mt: 2,
          }}
        >
          Continue
        </StyledButton>
      </StyledPaper>
    </Box>
  );
}
