"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "sonner";
import AuthProvider from "./AuthProvider";
type Props = { children: ReactNode };

export default function Provider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" richColors />
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
