"use server";

import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Box from "@mui/material/Box";

import { authOptions } from "@lib/auth.options";
import { ProfileProvider } from "@/lib/providers/Profile.Provider";
import { ProtectedContainerProvider } from "@/lib/providers/Protected.Container.Provider";
import { getUserById } from "@/service/user";
import { Grid } from "@mui/material";

export default async function ProtectedLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  const session: any = await getServerSession(authOptions);
  if (!session) {
    return redirect(`/${lang}/login`);
  }

  const profileResponse = await getUserById(session?.user?._id);

  if (!profileResponse?.success || !profileResponse?.data) {
    return redirect(`/${lang}/login`);
  }

  return (
    <Box>
      <ProfileProvider profile={profileResponse?.data} />
      <ProtectedContainerProvider>
        <Grid container gap={0} flex={1}>
          <Grid flex={1}>{children}</Grid>
        </Grid>
      </ProtectedContainerProvider>
    </Box>
  );
}
