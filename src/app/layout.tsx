import React, { ReactNode } from "react";
import Head from "next/head";

import "./globals.css";
import "react-phone-input-2/lib/material.css";

import {
  ReduxStoreProvider,
  ThemeProvider,
  NextAuthProvider,
} from "@/lib/index";

export const metadata = {
  title: "Boiler plate",
  description: "Your one-stop solution for fast and easy top-ups",
};

export default async function RootLayoutDep({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      {/* Load the miniapp SDK asynchronously */}

      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ReduxStoreProvider>
        <ThemeProvider>
          <body>
            <NextAuthProvider>{children}</NextAuthProvider>
          </body>
        </ThemeProvider>
      </ReduxStoreProvider>
    </html>
  );
}
