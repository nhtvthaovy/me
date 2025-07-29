"use client";

import React, { useEffect, useRef, useState } from "react";

interface MessageProps {
  status?: number | null;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Message: React.FC<MessageProps> = ({
  status,
  message,
  duration = 4000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);
  const toastRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false); // 👈 Thêm biến này để đổi con trỏ

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  useEffect(() => {
    const toast = toastRef.current;
    if (!toast) return;

    let startX = 0;
    let startY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      toast.classList.add("cursor-grabbing");
      toast.classList.remove("cursor-grab");

      toast.style.userSelect = "none";

      startX = e.clientX - position.current.x;
      startY = e.clientY - position.current.y;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      position.current.x = e.clientX - startX;
      position.current.y = e.clientY - startY;
      toast.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      toast?.classList.remove("cursor-grabbing");
      toast?.classList.add("cursor-grab");
      
      toast.style.userSelect = "";

      const rect = toast.getBoundingClientRect();
      const outOfView =
        rect.top < 0 ||
        rect.left < 0 ||
        rect.right > window.innerWidth ||
        rect.bottom > window.innerHeight;

      if (outOfView) {
        setVisible(false);
        onClose?.();
      }

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    toast.addEventListener("mousedown", onMouseDown);
    toast.classList.add("cursor-grab"); // 👈 Mặc định là "grab"

    return () => {
      toast.removeEventListener("mousedown", onMouseDown);
    };
  }, [onClose]);

  if (!status || !visible) return null;

  let variantClass = "";
  let label = "";

  if (status >= 200 && status < 300) {
    variantClass = "bg-green-100 text-green-800 border-green-500";
    label = "Success";
  } else if (status >= 400) {
    variantClass = "bg-red-100 text-red-800 border-red-500";
    label = "Error";
  } else {
    variantClass = "bg-blue-100 text-blue-800 border-blue-500";
    label = "Info";
  }

  return (
    <div
      ref={toastRef}
      className={`fixed top-[7vh] left-1/2 -translate-x-1/2 z-[9999] px-6 py-4 text-base rounded-xl border-l-4 shadow-xl w-[350px] ${variantClass}`}
      style={{ transition: "transform 0.2s ease" }}
    >
      {/* Close button */}
      <button
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        className="absolute top-2 right-2 text-sm text-gray-500 hover:text-gray-700"
        aria-label="Close toast"
      >
        ✕
      </button>

      <strong className="font-semibold">{label}</strong>
      <div className="text-sm mt-1">{message}</div>
    </div>
  );
};

export default Message;
