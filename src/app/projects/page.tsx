/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Variants, motion } from "framer-motion";
import Card from "../components/ui/Card";
import Loading from "../components/ui/Loading";
import { useSearchParams } from "next/navigation";
import { Github } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  img: string;
  des: string;
  pageId: string;
  published: boolean;
}

interface Block {
  imageUrl?: any;
  checked?: boolean;
  type: string;
  text?: string;
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsContent() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const searchParams = useSearchParams();
  const pageIdFromUrl = searchParams.get("pageId");

  useEffect(() => {
    if (pageIdFromUrl) {
      setSelectedPageId(pageIdFromUrl);
    }
  }, [pageIdFromUrl]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project?mode=list");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load projects");
        setProjects(data);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!selectedPageId) return;
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "detail", pageId: selectedPageId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load detail");
        setBlocks(data.blocks);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [selectedPageId]);

  const paginatedProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  return (
    <main className="bg-[#FEFFF0] min-h-screen flex flex-col items-center p-10">
      {!selectedPageId ? (
        <>
          {loading && <Loading />}
          {error && <p className="text-red-500">Error: {error}</p>}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
            className="text-center mb-10 max-w-2xl mx-auto"
          >
            <h2 className="font-[cursive] text-3xl font-bold text-[#f97316] mb-4">
              What have I built?
            </h2>
            <p className="text-[#4a4a4a] text-lg">
              Each one's a little lesson.
            </p>
          </motion.div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
            {paginatedProjects.map((project, index) => (
              <Card
                key={project.id}
                image={project.img}
                title={project.title}
                description={project.des}
                index={index}
                as="li"
                fallbackText="No image"
                onClick={() => setSelectedPageId(project.pageId)}
              />
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-full border border-[#f4a7b9] text-[#f4a7b9] hover:bg-[#f4a7b9] hover:text-white transition ${
                    currentPage === i + 1 ? "bg-[#f4a7b9] text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {loading && <Loading />}
          {error && <p className="text-red-500">Error: {error}</p>}

          <div className="mt-4 max-w-2xl space-y-4 text-lg leading-relaxed">
            <a
              href="https://github.com/nhtvthaovy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mb-4"
            >
              <Github className="w-8 h-8 md:w-12 md:h-12 text-black" />
              <span className="text-[10px] md:text-sm font-medium text-black mt-1">
                GitHub
              </span>
            </a>
            {blocks.map((block, index) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={index} className="text-gray-800 mb-2 text-justify">
                      {block.text}
                    </p>
                  );
                case "heading_1":
                  return (
                    <h1 key={index} className="text-3xl font-bold mt-4 mb-2 ">
                      {block.text}
                    </h1>
                  );
                case "heading_2":
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-3 mb-2">
                      {block.text}
                    </h2>
                  );
                case "heading_3":
                  return (
                    <h2 key={index} className="text-xl font-bold mt-3 mb-2">
                      {block.text}
                    </h2>
                  );
                case "bulleted_list_item":
                case "numbered_list_item":
                  return (
                    <li key={index} className="list-inside">
                      {block.text}
                    </li>
                  );
                case "to_do":
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <input type="checkbox" checked={block.checked} readOnly />
                      <span>{block.text}</span>
                    </div>
                  );
                case "quote":
                  return (
                    <blockquote
                      key={index}
                      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2"
                    >
                      {block.text}
                    </blockquote>
                  );
                case "code":
                  return (
                    <pre
                      key={index}
                      className="bg-gray-100 rounded p-2 text-sm font-mono overflow-auto my-2"
                    >
                      {block.text}
                    </pre>
                  );
                case "image":
                  return block.imageUrl ? (
                    <img
                      key={index}
                      src={block.imageUrl}
                      alt="Notion Image"
                      className="my-4 max-w-full rounded shadow"
                    />
                  ) : null;
                case "divider":
                  return (
                    <hr key={index} className="my-6 border-t border-gray-300" />
                  );
                default:
                  return (
                    <p key={index} className="text-gray-400 italic">
                      [Không hỗ trợ: {block.type}]
                    </p>
                  );
              }
            })}
          </div>

          <a
            href="https://github.com/nhtvthaovy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-6"
          >
            <Github className="w-8 h-8 md:w-12 md:h-12 text-black" />
            <span className="text-[10px] md:text-sm font-medium text-black mt-1">
              GitHub
            </span>
          </a>
        </>
      )}
    </main>
  );
}
