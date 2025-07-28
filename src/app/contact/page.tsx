"use client";
import { motion, Variants } from "framer-motion";
import { FaEnvelope, FaLink, FaInstagram } from "react-icons/fa";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.5,
      ease: "easeInOut",
    },
  }),
};

export default function Contact() {
  return (
    <div className="w-screen min-h-screen bg-[#FEFFF0] flex items-center justify-center px-4 md:px-12">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
        {/* LEFT TEXT */}
        <motion.div
          className="space-y-4"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#A57AC4] leading-snug">
            Let’s connect.
          </h1>
          <p className="text-base text-[#555]">
            Whether you’re here to share ideas, explore collaboration, or just
            say hello — I’d be happy to hear from you!
          </p>
        </motion.div>

        {/* RIGHT CONTACT INFO */}
        <motion.div
          className="space-y-6 text-[#444]"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {/* Email */}
          <div className="flex items-center space-x-4">
            <FaEnvelope className="w-5 h-5 text-[#A57AC4]" />
            <div>
              <h2 className="text-lg font-semibold">Email</h2>
              <a
                href="mailto:nhtv.thaovy@gmail.com"
                className="text-[#6EB5C0] underline hover:text-[#4A98A1] transition-colors"
              >
                nhtv.thaovy@gmail.com
              </a>
            </div>
          </div>

          {/* Instagram */}
          <div className="flex items-center space-x-4">
            <FaInstagram className="w-5 h-5 text-[#D26F9E]" />
            <div>
              <h2 className="text-lg font-semibold">Instagram</h2>
              <a
                href="https://www.instagram.com/yvoaht_neyugnhnyuh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6EB5C0] underline hover:text-[#4A98A1] transition-colors"
              >
                @yvoaht_neyugnhnyuh
              </a>
            </div>
          </div>

          {/* Threads */}
          <div className="flex items-center space-x-4">
            <FaLink className="w-5 h-5 text-[#A57AC4]" />
            <div>
              <h2 className="text-lg font-semibold">Threads</h2>
              <a
                href="https://www.threads.com/@yvoaht_neyugnhnyuh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6EB5C0] underline hover:text-[#4A98A1] transition-colors"
              >
                @yvoaht_neyugnhnyuh
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
