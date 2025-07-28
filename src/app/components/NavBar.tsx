"use client";

import { useState } from "react";
import { Moon, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";


const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);


  // Ẩn ở "/" và "/start"
  if (pathname === "/" || pathname === "/start") return null;

  // Lấy phần sau "/" làm current (vd: "/home" => "home")
  const current = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const navItems = [
    { id: "home", label: "Home" },
    { id: "blog", label: "Blog" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="w-full py-6 bg-[#FEFFF0] relative z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
<Link href="/" className="text-2xl font-semibold text-[#1B4D4A]">
  <span className="font-bold text-[#377C74]">T</span>
  Vy.
</Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex justify-center items-center space-x-8 text-[17px] font-semibold text-[#1B1B1B]">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`/${item.id}`}
                className={`transition-colors px-2 py-1 cursor-pointer ${
                  current === item.id
                    ? "text-[#377C74]"
                    : "text-[#1B1B1B] hover:text-[#377C74]"
                }`}
              >
                {current === item.id ? `( ${item.label} )` : item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile right */}
        <div className="flex items-center gap-4 text-[#1B1B1B]">
          <button className="hover:text-[#377C74] transition-colors">
            <Moon size={20} />
          </button>

          <button
            className="md:hidden hover:text-[#377C74]"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#FEFFF0] flex flex-col items-center justify-center text-xl font-semibold text-[#1B1B1B] space-y-8 z-50 transition-all">
          <button
            className="absolute top-6 right-6 text-[#1B1B1B] hover:text-[#377C74]"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </button>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`/${item.id}`}
              onClick={() => setIsOpen(false)}
              className={`text-2xl ${
                current === item.id
                  ? "text-[#377C74]"
                  : "text-[#1B1B1B] hover:text-[#377C74]"
              }`}
            >
              {current === item.id ? `( ${item.label} )` : item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
