"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  weight: ["500", "700"],
  subsets: ["latin"],
});

export default function Start() {
  const router = useRouter();

  return (
    <>
      <div className="w-screen h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#fef6ff]">
        {/* Nền nhiều vòng tròn tím hồng nhỏ hơn */}
        <div className="absolute inset-0 z-0">
          {/* Các vòng tròn */}
          <div className="absolute w-[120px] h-[120px] bg-pink-300 opacity-30 rounded-full blur-2xl top-5 left-8" />
          <div className="absolute w-[180px] h-[180px] bg-purple-400 opacity-25 rounded-full blur-xl top-24 left-40" />
          <div className="absolute w-[200px] h-[200px] bg-fuchsia-300 opacity-20 rounded-full blur-xl bottom-24 right-32" />
          <div className="absolute w-[60px] h-[60px] bg-pink-400 opacity-35 rounded-full blur-md bottom-10 left-20" />
          <div className="absolute w-[150px] h-[150px] bg-purple-300 opacity-15 rounded-full blur-3xl top-32 right-10" />
          <div className="absolute w-[90px] h-[90px] bg-fuchsia-400 opacity-25 rounded-full blur-xl bottom-36 left-1/3" />
          <div className="absolute w-[70px] h-[70px] bg-pink-300 opacity-30 rounded-full blur-lg top-14 right-1/4" />
          <div className="absolute w-[110px] h-[110px] bg-purple-500 opacity-20 rounded-full blur-2xl bottom-16 right-1/2" />
        </div>

        {/* Nút Start */}
        <motion.div
          onClick={() => router.push("/home")}
          initial={{ scale: 1 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px #a78bfa, 0 0 60px #8b5cf6",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative z-10 w-[160px] h-[160px] rounded-full overflow-hidden cursor-pointer"
        >
          <Image
            src="/start.gif"
            alt="Start Button"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-white text-2xl drop-shadow-lg ${orbitron.className}`}
            >
              START
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
}
