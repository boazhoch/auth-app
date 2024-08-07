"use client";

import React from "react";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("./login"), { ssr: false });

export function ClientOnly() {
  return <Login />;
}
