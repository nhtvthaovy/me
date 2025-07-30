"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// 1. Slide từ trái
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.7, duration: 0.6, ease: "easeOut" },
  }),
};

// 2. Xoay nhẹ + scale in
const rotateScale: Variants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { delay: i * 0.7, type: "spring", stiffness: 60 },
  }),
};

// 3. Avatar pop out
const popBounce: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 10 },
  },
};

// 4. Fade nhẹ nhàng
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

export default function HeroSection() {
  return (
    <div className="w-screen h-screen bg-[#FEFFF0] flex items-center justify-center px-4 md:px-12">
      <div className="w-full max-w-7xl grid grid-cols-3 grid-rows-3 h-full min-w-0">
        {/* LEFT TEXT - slideLeft */}
        <motion.div
          className="row-start-1 col-start-1 flex flex-col justify-end space-y-2 max-w-xs"
          variants={slideLeft}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <p className="text-base text-[#1E1E1E]">Welcome to creative lab,</p>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] leading-snug">
            Hy! I Am
          </h1>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#F4A7B9] leading-snug">
            Vy.
          </h2>
        </motion.div>

        {/* RIGHT TEXT - rotateScale */}
        <motion.div
          className="row-start-1 col-start-3 text-right text-base text-[#1E1E1E] flex justify-end items-end max-w-xs"
          variants={rotateScale}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <p>
            A human who wants a soul balancing logic and beauty
            <br />
            but hasn’t found it yet.
          </p>
        </motion.div>

        {/* AVATAR - popBounce */}
        <motion.div
          className="row-start-2 col-start-2 flex justify-center items-center"
          variants={popBounce}
          initial="hidden"
          animate="visible"
        >
          <div className="relative">
            <div className="bg-gradient-to-t from-[#A5D8FF] via-[#4098D7]/30 to-transparent p-[5px] rounded-full">
              <div
                className="w-[250px] h-[250px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px]
                rounded-full overflow-hidden shadow-md relative transition-all duration-300"
              >
                <Image
                  src="/avatar.png"
                  alt="Avatar"
                  width={400}
                  height={400}
                  unoptimized
                  placeholder="empty"
                  priority
                  className="object-cover w-full h-full"
                  style={{ imageRendering: "crisp-edges" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* LEFT SLOGAN - fadeIn */}
        <motion.div
          className="row-start-3 col-start-1 pt-1 space-y-1 max-w-xs"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <p className="text-3xl font-extrabold text-[#37806B] leading-snug">
            A lab
          </p>
          <p className="text-base font-medium text-[#1E1E1E]">
            where playful ideas quietly sprout,
          </p>
          <p className="text-base font-medium text-[#1E1E1E]">
            and grow with wonder and curiosity.
          </p>
        </motion.div>

        {/* RIGHT SLOGAN - fadeIn */}
        <motion.div
          className="row-start-3 col-start-3 text-right space-y-1 max-w-xs"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <p className="text-2xl font-bold italic text-[#D8BFD8] font-[cursive]">
            After all, it’s me
          </p>
          <p className="text-2xl font-semibold text-[#F3C6D3]">and only me.</p>
        </motion.div>
      </div>
    </div>
  );
}
