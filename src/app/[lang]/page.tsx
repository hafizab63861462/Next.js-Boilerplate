"use server";

import React from "react";
import dynamic from "next/dynamic";

const HomeComponent = dynamic(() =>
  import("@/components/home").then((mod) => mod.HomeComponent)
);

export default async function HomePage({
  searchParams,
}: {
  searchParams: any;
}) {
  const params = await searchParams;
  return <HomeComponent />;
}
