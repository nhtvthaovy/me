"use client";
import { motion, Variants } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";

// Reuse animations
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const rotateScale: Variants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 60 },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#FEFFF0] px-4 md:px-12 py-10 border-t border-[#F4A7B9]/30">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-end gap-4">
        {/* LEFT - Quote */}
        <motion.div
          className="text-sm text-[#1E1E1E] italic space-y-1 max-w-xs"
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>
            Somewhere between <span className="text-[#37806B]">code</span> and{" "}
            <span className="text-[#F4A7B9]">chaos</span>,
          </p>
          <p>The page fades, but the story goes on.</p>
          <p>Thank you for wandering this far.</p>
        </motion.div>

        {/* CENTER - GitHub */}
        <motion.div
          className="flex justify-center"
          variants={rotateScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link
            href="https://github.com/nhtvthaovy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#1E1E1E] hover:text-[#F4A7B9] transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium">@nhtvthaovy</span>
          </Link>
        </motion.div>

        {/* RIGHT - Copyright */}
        <motion.div
          className="text-right text-xs text-[#888]"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} Vy Nguyễn Huỳnh Thảo</p>
        </motion.div>
      </div>
    </footer>
  );
}
