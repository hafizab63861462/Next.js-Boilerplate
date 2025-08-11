"use client";

import React, { ReactNode } from "react";
import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <Box pb={12}>{children}</Box>;
}
