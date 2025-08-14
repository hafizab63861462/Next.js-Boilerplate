"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

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
        height: "100vh",
        backgroundColor: "background.paper",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          boxShadow: 5,
          p: "50px 50px 14px 50px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
          margin: "auto",
        }}
      >
        {/* Centered Headings */}
        <Typography
          variant="h5"
          component="h1"
          fontWeight="bold"
          gutterBottom
          align="center" // Centers the text
        >
          Sign in
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3 }}
          align="center" // Centers the text
        >
          Welcome back! Please sign in to continue.
        </Typography>

        {/* Form Fields */}
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
              transform: "translate(14px, 8px) scale(1)",
              fontSize: "14px",
            },
            "& .MuiInputLabel-shrink": {
              transform: "translate(14px, -6px) scale(0.75)",
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
              transform: "translate(14px, 8px) scale(1)",
              fontSize: "14px",
            },
            "& .MuiInputLabel-shrink": {
              transform: "translate(14px, -6px) scale(0.75)",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
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
        </Button>

        <Divider sx={{ mt: "24px", mb: "14px" }} />

        <Typography variant="body2" color="text.secondary" align="center">
          Don’t have an account?{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ cursor: "pointer", fontWeight: 500 }}
          >
            Sign up
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
