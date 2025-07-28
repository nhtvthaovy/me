"use client";

import { useEffect } from "react";

export default function StarryBackground() {
  useEffect(() => {
    // === CREATE STARS ===
    function createStars(count: number) {
      for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 2 + 1;
        const delay = Math.random() * 3;

        Object.assign(star.style, {
          left: `${x}px`,
          top: `${y}px`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
          position: "absolute",
        });

        document.body.appendChild(star);
      }
    }

    // === SHOOTING STAR ===
    function createShootingStar() {
      const star = document.createElement("div");
      star.classList.add("shooting-star");

      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * (window.innerHeight / 2);
      const angle = Math.random() * 60 - 30;
      const distance = Math.random() * 400 + 200;

      const travelX = Math.cos(angle * Math.PI / 180) * distance;
      const travelY = Math.sin(angle * Math.PI / 180) * distance;

      Object.assign(star.style, {
        left: `${startX}px`,
        top: `${startY}px`,
        setProperty: "--angle",
        "--angle": `${angle}deg`,
        "--travel-x": `${travelX}px`,
        "--travel-y": `${travelY}px`,
        animation: `shoot ${Math.random() * 2 + 1}s linear forwards`,
      });

      document.body.appendChild(star);
      setTimeout(() => star.remove(), 3000);
    }

    // === NEBULAS ===
    function createNebulas(count: number) {
      const colors = [
        ["rgba(255, 192, 203, 0.5)", "rgba(238, 130, 238, 0.2)"],
        ["rgba(238, 130, 238, 0.5)", "rgba(148, 0, 211, 0.2)"],
        ["rgba(255, 105, 180, 0.4)", "rgba(199, 21, 133, 0.2)"],
      ];

      for (let i = 0; i < count; i++) {
        const nebula = document.createElement("div");
        nebula.classList.add("nebula");

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 300 + 100;
        const [c1, c2] = colors[Math.floor(Math.random() * colors.length)];

        Object.assign(nebula.style, {
          left: `${x}px`,
          top: `${y}px`,
          width: `${size}px`,
          height: `${size}px`,
          setProperty: "--color1",
          "--color1": c1,
          "--color2": c2,
        });

        document.body.appendChild(nebula);
      }
    }

    // Init
    createStars(200);
    createNebulas(5);
    const interval = setInterval(createShootingStar, 2000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
