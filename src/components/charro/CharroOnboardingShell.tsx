"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CharroOnboardingShellProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function CharroOnboardingShell({
  eyebrow = "Comunidad Charro",
  title,
  subtitle,
  children,
}: CharroOnboardingShellProps) {
  return (
    <div className="charro-auth min-h-screen">
      <div className="charro-auth__pattern" aria-hidden />
      <div className="charro-onboarding__ornament charro-onboarding__ornament--left" aria-hidden />
      <div className="charro-onboarding__ornament charro-onboarding__ornament--right" aria-hidden />

      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 py-10 sm:py-14">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 w-full max-w-3xl text-center"
        >
          <Link href="/" className="inline-block">
            <p className="charro-auth__eyebrow">Soy El Charro Mexican</p>
            <h1 className="charro-auth__brand">El Charro González</h1>
          </Link>
          <div className="charro-auth__divider mx-auto mt-4" />
          <p className="charro-auth__eyebrow mt-6">{eyebrow}</p>
          <h2 className="charro-auth__title mt-2 text-2xl sm:text-3xl">{title}</h2>
          {subtitle && (
            <p className="charro-auth__subtitle mx-auto mt-3 max-w-xl">{subtitle}</p>
          )}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="w-full max-w-3xl"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
