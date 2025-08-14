// components/AuthForm.tsx
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

type AuthFormProps = {
  title: string;
  subtitle: string;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  footerText: string;
  footerLinkLabel: string;
  onFooterLinkClick: () => void;
  isShowCosnfirmPassword?: boolean;
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
  isShowCosnfirmPassword = false,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: AuthFormProps) {
  // State for toggling password visibility
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

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
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, fontSize: "14px" }}
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

      {/* Password Field with Toggle */}
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="small"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Confirm Password Field with Toggle */}
      {isShowCosnfirmPassword && (
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                  size="small"
                >
                  {showConfirmPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
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
