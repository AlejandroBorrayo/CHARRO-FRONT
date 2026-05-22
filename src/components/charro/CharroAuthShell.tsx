"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CharroAuthShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function CharroAuthShell({
  title,
  subtitle,
  children,
  footer,
}: CharroAuthShellProps) {
  return (
    <div className="charro-auth min-h-screen">
      <div className="charro-auth__pattern" aria-hidden />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <header className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <p className="charro-auth__eyebrow">Soy El Charro Mexican</p>
              <h1 className="charro-auth__brand">El Charro González</h1>
            </Link>
            <div className="charro-auth__divider mx-auto mt-4" />
            <h2 className="charro-auth__title mt-6">{title}</h2>
            {subtitle && (
              <p className="charro-auth__subtitle mt-2">{subtitle}</p>
            )}
          </header>

          <div className="charro-auth__card">{children}</div>

          {footer && <div className="mt-6 text-center">{footer}</div>}
        </motion.div>
      </div>
    </div>
  );
}
