import type { ReactNode } from "react";

type CharroFormMessageProps = {
  variant: "error" | "success";
  children: ReactNode;
};

const styles = {
  error: "border-red-800/50 bg-red-950/40 text-red-300",
  success: "border-emerald-800/50 bg-emerald-950/40 text-emerald-300",
};

export function CharroFormMessage({ variant, children }: CharroFormMessageProps) {
  return (
    <p
      className={`rounded-md border px-3 py-2 text-sm ${styles[variant]}`}
      role={variant === "error" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}
