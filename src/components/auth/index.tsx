"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

type AuthFormProps = {
  title: string;
  subtitle: string;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  footerText: string;
  footerLinkLabel: string;
  onFooterLinkClick: () => void;
  showConfirmPassword?: boolean;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword?: string;
  setConfirmPassword?: (confirmPassword: string) => void;
};

export default function AuthForm({
  title,
  subtitle,
  primaryActionLabel,
  onPrimaryAction,
  footerText,
  footerLinkLabel,
  onFooterLinkClick,
  showConfirmPassword = false,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: AuthFormProps) {
  return (
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
      {/* Headings */}
      <Typography
        variant="h5"
        component="h1"
        fontWeight="bold"
        gutterBottom
        align="center"
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3 }}
        align="center"
      >
        {subtitle}
      </Typography>

      {/* Email Field */}
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

      {/* Password Field */}
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete={showConfirmPassword ? "new-password" : "current-password"}
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

      {showConfirmPassword && (
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword?.(e.target.value)}
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
      )}

      {/* Submit Button */}
      <Button
        type="button"
        variant="contained"
        onClick={onPrimaryAction}
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
        {primaryActionLabel}
      </Button>

      <Divider sx={{ mt: "24px", mb: "14px" }} />

      {/* Footer Link */}
      <Typography variant="body2" color="text.secondary" align="center">
        {footerText}{" "}
        <Typography
          component="span"
          color="primary"
          sx={{
            cursor: "pointer",
            fontWeight: 500,
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={onFooterLinkClick}
        >
          {footerLinkLabel}
        </Typography>
      </Typography>
    </Box>
  );
}
