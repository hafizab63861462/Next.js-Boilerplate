"use server";

import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@lib/auth.options";
import { getUserById } from "@/service/user";

export default async function AuthLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  const session: any = await getServerSession(authOptions);
  if (session) {
    const profileResponse = await getUserById(session?.user?.id);
    if (profileResponse?.success && profileResponse?.data) {
      return redirect(`/${lang}/dashboard`);
    }
  }
  return <>{children}</>;
}
