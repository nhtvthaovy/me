"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        className="w-12 h-12 border-4 border-[#A57AC4] border-t-transparent rounded-full animate-spin"
        aria-label="Loading..."
      />
    </div>
  );
}
