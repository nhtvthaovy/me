"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Card from "./ui/Card";

const fadeCard: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

interface ProjectItem {
  id: string;
  title: string;
  img: string;
  des: string;
  pageId: string;
  published: boolean;
}

export default function ProjectSection() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project?mode=list");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="w-full bg-[#FEFFF0] py-16 px-4 md:px-12 flex justify-center">
      <div className="max-w-7xl w-full">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#37806B] to-[#EDB33C] mb-2"
          variants={fadeCard}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Projects
        </motion.h2>

        <motion.div
          className="w-16 h-1 bg-[#F4A7B9] rounded-full mb-6"
          variants={fadeCard}
          initial="hidden"
          animate="visible"
          custom={0.5}
        />

        <motion.p
          className="text-base text-[#4A4A4A] max-w-7xl mb-10 leading-relaxed"
          variants={fadeCard}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          These are just a few things I’ve built. They’re not flawless but I’ve
          learned something...
        </motion.p>

        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
            {projects.slice(0, 5).map((project, index) => (
              <Card
                key={project.id}
                image={project.img}
                title={project.title}
                description={project.des}
                index={index}
                as="li"
                fallbackText="No image"
                onClick={() => {
                  window.location.href = `/projects?pageId=${project.pageId}`;
                }}
              />
            ))}

            {/* View All */}
            <motion.div
              className="flex items-center justify-center h-full min-h-[220px] cursor-pointer"
              variants={fadeCard}
              initial="hidden"
              animate="visible"
              custom={7}
              onClick={() => (window.location.href = "/projects")}
            >
              <div className="flex flex-col items-center gap-2 group transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 text-[#f97316] hover:text-[#ea580c]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="text-base font-semibold">View All</span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
