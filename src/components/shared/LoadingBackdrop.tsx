"use client";
import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

interface LoadingBackdropProps {
  open: boolean;
  message?: string;
  transparent?: boolean;
}

export const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({
  open,
  message,
  transparent = false,
}) => {
  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: transparent ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.7)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="inherit" />
      {message && (
        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 500 }}>
          {message}
        </Typography>
      )}
    </Backdrop>
  );
};
