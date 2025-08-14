"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth";
import { signIn } from "next-auth/react";

const LoginComponent = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn("login", {
      email,
      password,
      redirect: false,
    });

    console.log("res", res);
  };

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
      }}
    >
      <AuthForm
        title="Sign in"
        subtitle="Welcome back! Please sign in to continue."
        primaryActionLabel="Continue"
        onPrimaryAction={handleLogin}
        footerText="Don’t have an account?"
        footerLinkLabel="Sign up"
        onFooterLinkClick={() => router.push("/signup")}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </Box>
  );
};

export default LoginComponent;
