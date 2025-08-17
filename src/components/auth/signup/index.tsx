"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth";
import { signIn } from "next-auth/react";
import { signupUser } from "@/service/user";

const SignUpComponent = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    const res = await signupUser(email, password, confirmPassword);
    if (res.success) {
      const signInRes = await signIn("login", {
        redirect: false,
        email,
        password,
      });

      if (signInRes?.ok) {
        router.push("/dashboard");
      } else {
        router.push("/login?error=login_failed_after_signup");
      }
    } else {
      alert(res.error || "Sign-up failed");
    }
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
        title="Create your account"
        subtitle="Welcome! Please fill in the details to get started."
        primaryActionLabel="Continue"
        onPrimaryAction={handleSignUp}
        footerText="Already have an account?"
        footerLinkLabel="Sign in"
        onFooterLinkClick={() => router.push("/login")}
        isShowCosnfirmPassword
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </Box>
  );
};

export default SignUpComponent;
