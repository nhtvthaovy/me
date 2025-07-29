"use client";

import { useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { FaEnvelope, FaLink, FaInstagram } from "react-icons/fa";
import Message from "../components/ui/Message";
import Loading from "../components/ui/Loading";

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
  const [status, setStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return; // ngăn gửi nhiều lần

    setIsLoading(true); // bật loading

    const form = new FormData(formRef.current!);
    const data = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setStatus(res.status);
      setMessage(result.message || result.error);

      if (res.ok && formRef.current) {
        formRef.current.reset();
      }
    } catch {
      setStatus(500);
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); // tắt loading sau khi xong
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#FEFFF0] flex items-center justify-center px-4 md:px-12">
      {isLoading && <Loading />}

      {status !== null && (
        <Message
          status={status}
          message={message}
          onClose={() => setStatus(null)}
        />
      )}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
        {/* LEFT TEXT + FORM */}
        <motion.div
          className="space-y-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#A57AC4] leading-snug">
              Let’s connect.
            </h1>
            <p className="text-base text-[#555]">
              Whether you’re here to share ideas, explore collaboration, or just
              say hello — I’d be happy to hear from you!
            </p>
          </div>

          {/* FORM */}
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-[#444]">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A57AC4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#444]">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A57AC4]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#444]">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A57AC4]"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-md transition text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#A57AC4] hover:bg-[#8c5aaa]"
              }`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
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
