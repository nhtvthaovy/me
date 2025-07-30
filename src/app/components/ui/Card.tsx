/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface CardProps {
  image?: string;
  title: string;
  description?: string;
  fallbackText?: string;
  index?: number;
  onClick?: () => void;
  as?: "div" | "li"; // dùng cho <motion.div> hoặc <motion.li>
  variants?: any;
}

export default function Card({
  image,
  title,
  description,
  fallbackText = "No Image",
  index = 0,
  onClick,
  as = "div",
  variants,
}: CardProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      key={index}
      className="relative bg-white flex flex-col p-4"
      variants={variants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={onClick}
    >
      {/* 4 viền bo hiệu ứng */}
      <div className="absolute h-[4px] w-[105%] -left-[2%] top-0 bg-[#D8BFD8] z-10 rounded-full shadow-[-4px_6px_0_rgba(244,167,185,0.6)]"></div>
      <div className="absolute h-[4px] w-[105%] -left-[4%] bottom-0 bg-[#D8BFD8] z-10 rounded-full shadow-[-4px_6px_0_rgba(244,167,185,0.6)]"></div>
      <div className="absolute w-[4px] h-[106%] -top-[3%] left-0 bg-[#D8BFD8] z-10 rounded-full shadow-[-4px_6px_0_rgba(244,167,185,0.6)]"></div>
      <div className="absolute w-[4px] h-[107%] -top-[4%] right-0 bg-[#D8BFD8] z-10 rounded-full shadow-[-4px_6px_0_rgba(244,167,185,0.6)]"></div>

      {/* Nội dung card */}
      <div className="overflow-hidden">
        <div className="relative w-full h-48">
          {image ? (
            image.startsWith("/") || image.startsWith("http") ? (
              <Image src={image} alt={title} fill className="object-cover rounded-lg" />
            ) : (
              <img
                src={image}
                alt={title}
                className="object-cover w-full h-full rounded-lg"
              />
            )
          ) : (
            <div className="rounded-lg w-full h-full flex items-center justify-center text-[#f4a7b9] text-sm italic bg-[#fef5f8]">
              {fallbackText}
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col gap-2 text-left items-start">
          <h3 className="text-lg font-semibold text-[#F4A7B9] leading-snug break-words hover:text-[#d26485] transition">
            {title}
          </h3>
          {description && (
            <p className="text-[#4A4A4A] text-sm line-clamp-3">{description}</p>
          )}
        </div>
      </div>
    </MotionTag>
  );
}
