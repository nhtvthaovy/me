/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Variants } from "framer-motion";
import Card from "../components/ui/Card";
import Loading from "../components/ui/Loading";

interface BlogItem {
  id: string;
  title: string;
  img: string;
  des: string;
  pageId: string;
  published: boolean;
}

interface Block {
  imageUrl: any;
  checked: boolean | undefined;
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog?mode=list");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load blogs");
        setBlogs(data);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!selectedPageId) return;
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/blog", {
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


  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  return (
    <main className="bg-[#FEFFF0] min-h-screen flex flex-col items-center p-10">
      {!selectedPageId ? (
        <>
          {/* Loading & Error */}
          {loading && <Loading />}
          {error && <p className="text-red-500">Error: {error}</p>}

          {/* Blog Intro Section */}
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="font-[cursive] text-3xl sm:text-3xl font-bold text-[#f97316] mb-4 leading-snug">
              What am I writing here?
            </h2>
            <p className="text-[#4a4a4a] text-lg sm:text-l">
              Maybe a few quiet thoughts. Maybe something I’ll laugh at later.
              But for now, I’ll leave them here, raw, small, and gently real.
            </p>
          </div>

          {/* Blog Grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
            {paginatedBlogs.map((blog, index) => (
              <Card
                key={blog.id}
                image={blog.img}
                title={blog.title}
                description={blog.des}
                index={index}
                as="li"
                fallbackText="No image"
                onClick={() => setSelectedPageId(blog.pageId)}
              />
            ))}
          </ul>

          {/* Pagination */}
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
          {loading && <p>Đang tải nội dung...</p>}
          {error && <p className="text-red-500">Lỗi: {error}</p>}

          <div className="font-[cursive] mt-4 max-w-2xl space-y-4 text-lg leading-relaxed">
            {blocks.map((block, index) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={index} className="text-gray-800 mb-2">
                      {block.text}
                    </p>
                  );
                case "heading_1":
                  return (
                    <h1 key={index} className="text-3xl font-bold mt-4 mb-2">
                      {block.text}
                    </h1>
                  );
                case "heading_2":
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-semibold mt-3 mb-2"
                    >
                      {block.text}
                    </h2>
                  );
                case "bulleted_list_item":
                  return (
                    <li key={index} className="list-disc list-inside">
                      {block.text}
                    </li>
                  );
                case "numbered_list_item":
                  return (
                    <li key={index} className="list-decimal list-inside">
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
                default:
                  return (
                    <p key={index} className="text-gray-400 italic">
                      [Không hỗ trợ: {block.type}]
                    </p>
                  );
              }
            })}
          </div>
        </>
      )}
    </main>
  );
}
