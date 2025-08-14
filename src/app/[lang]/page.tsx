"use server";

import { redirect } from "next/navigation";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  redirect(`/${lang}/login`);
}
