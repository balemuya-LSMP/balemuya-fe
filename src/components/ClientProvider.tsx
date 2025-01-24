"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/contexts/authContext";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
