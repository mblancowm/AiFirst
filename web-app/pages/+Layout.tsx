import type { ReactNode } from "react";
import { QueryProvider } from "../src/QueryProvider";
import "../src/styles.css";

export function Layout({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
