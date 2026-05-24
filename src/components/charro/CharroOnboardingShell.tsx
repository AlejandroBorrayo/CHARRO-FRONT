"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { CharroLogo } from "@/components/charro/CharroLogo";

type CharroOnboardingShellProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  fullWidth?: boolean;
};

export function CharroOnboardingShell({
  eyebrow = "Comunidad Charro",
  title,
  subtitle,
  children,
  fullWidth = false,
}: CharroOnboardingShellProps) {
  const containerClass = fullWidth
    ? "relative z-10 flex min-h-screen w-full flex-col px-5 py-10 sm:px-8 sm:py-14 lg:px-12 xl:px-16"
    : "relative z-10 flex min-h-screen flex-col items-center px-4 py-10 sm:py-14";

  const headerClass = fullWidth
    ? "mb-8 w-full text-center"
    : "mb-8 w-full max-w-3xl text-center";

  const contentClass = fullWidth ? "w-full" : "w-full max-w-3xl";

  return (
    <div className="charro-auth min-h-screen">
      <div className="charro-auth__pattern" aria-hidden />
      <div className="charro-onboarding__ornament charro-onboarding__ornament--left" aria-hidden />
      <div className="charro-onboarding__ornament charro-onboarding__ornament--right" aria-hidden />

      <div className={containerClass}>
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={headerClass}
        >
          <CharroLogo priority />
          <div className="charro-auth__divider mx-auto mt-4" />
          <p className="charro-auth__eyebrow mt-6">{eyebrow}</p>
          <h2 className="charro-auth__title mt-2 text-2xl sm:text-3xl">{title}</h2>
          {subtitle && (
            <p
              className={`charro-auth__subtitle mx-auto mt-3 ${fullWidth ? "max-w-3xl" : "max-w-xl"}`}
            >
              {subtitle}
            </p>
          )}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className={contentClass}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
