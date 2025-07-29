"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const fadeCard: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const projects = [
  {
    title: "Task Manager – A Clean and Minimalist App to Stay Productive",
    description: "Manage your daily work with focus and flow.",
    image: "/projects/task-manager.png",
  },
  {
    title: "E-Commerce Analytics Dashboard with Real-Time Syncing",
    description: "Analyze sales and trends instantly.",
    image: "/projects/ecommerce.png",
  },
  {
    title: "Cross-Platform Fitness Tracker for Health-Conscious Users",
    description: "Track your health, sleep, and steps easily.",
    image: "/projects/fitness-app.png",
  },
  {
    title: "Portfolio Site with Interactive Animations",
    description: "A personal site with cool motion effects.",
    image: "/projects/portfolio.png",
  },
  {
    title: "AI Chatbot Assistant for Productivity",
    description: "Chatbot using OpenAI to assist daily tasks.",
    image: "/projects/chatbot.png",
  },
  {
    title: "Creative Landing Page for Design Agency",
    description: "Showcase of modern UI/UX design.",
    image: "/projects/design-agency.png",
  },
];


export default function ProjectSection() {
  return (
    <section className="w-full bg-[#FEFFF0] py-16 px-4 md:px-12 flex justify-center">
      <div className="max-w-7xl w-full">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4"
          variants={fadeCard}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Projects
        </motion.h2>

        <motion.p
          className="text-base text-[#4A4A4A] mb-10"
          variants={fadeCard}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Here are some of the projects I have worked on:
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-25">
{projects.slice(0, 5).map((project, index) => (
<motion.div
  key={index}
  className="relative bg-white flex flex-col p-4" 
  variants={fadeCard}
  initial="hidden"
  animate="visible"
  custom={index + 2}
>
{/* Top border */}
<div className="absolute h-[4px] w-[105%] -left-[2%] top-0 bg-[#F4A7B9] z-10 rounded-full shadow-[-4px_6px_0_rgba(244,167,185,0.6)]"></div>

{/* Bottom border */}
<div className="absolute h-[4px] w-[105%] -left-[4%] bottom-0 bg-[#F4A7B9] z-10 rounded-full shadow-[-4px_6px_0_rgba(244,167,185,0.6)]"></div>

{/* Left border */}
<div className="absolute w-[4px] h-[106%] -top-[3%] left-0 bg-[#F4A7B9] z-10 rounded-full shadow-[-4px_6px_0_rgba(244,167,185,0.6)]"></div>

{/* Right border */}
<div className="absolute w-[4px] h-[107%] -top-[4%] right-0 bg-[#F4A7B9] z-10 rounded-full shadow-[-4px_6px_0_rgba(244,167,185,0.6)]"></div>

  {/* Nội dung card */}
  <div className="overflow-hidden rounded-2xl"> {/* Nếu bạn vẫn muốn bo góc cho nội dung */}
    {/* Image */}
    <div className="relative w-full h-48">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover"
      />
    </div>

    {/* Text */}
    <div className="p-5 flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-[#F4A7B9] leading-snug break-words">
        {project.title}
      </h3>
      <p className="text-[#4A4A4A] text-sm">{project.description}</p>
    </div>
  </div>
</motion.div>



))}

{/* Card thứ 6: Mũi tên dẫn đến /projects */}
<motion.div
  className="flex items-center justify-center h-full min-h-[220px] cursor-pointer"
  variants={fadeCard}
  initial="hidden"
  animate="visible"
  custom={7}
  onClick={() => window.location.href = "/projects"}
>
<div className="flex flex-col items-center gap-2 text-[#f97316] hover:text-[#ea580c] transition">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
    <span className="text-sm font-medium">View All</span>
  </div>
</motion.div>


        </div>
      </div>
    </section>
  );
}
