"use client";

import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
}

export const ProtectedContainerProvider = ({ children }: Props) => {
  return (
    <Box
      sx={{
        // width: { sm: `calc(100% - ${componentSlice?.drawer?.sideMenuDrawerWidth}px)` },
        ml: 0,
        mr: 5,
        boxShadow: "none",
        color: "#3C3C3C",
      }}
    >
      {children}
    </Box>
  );
};
