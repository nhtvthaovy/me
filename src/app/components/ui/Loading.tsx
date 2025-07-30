/* eslint-disable @next/next/no-img-element */
"use client";

export default function LoadingGarden() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur-md flex items-center justify-center">
      <img
        src="https://media.giphy.com/media/l4FGv5Ci0WIp8kYhO/giphy.gif"
        alt="Loading Flower"
        className="w-92 h-92 object-contain"
      />
    </div>
  );
}
