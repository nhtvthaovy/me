"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Start() {
  const [count1, setCount1] = useState(1); // đến 10
  const [count2, setCount2] = useState(1); // đến 11
  const router = useRouter();

  useEffect(() => {
    let timer1: NodeJS.Timeout | null = null;
    let timer2: NodeJS.Timeout | null = null;

    if (count1 < 10) {
      timer1 = setTimeout(() => setCount1((prev) => prev + 1), 100);
    }

    if (count2 < 11) {
      timer2 = setTimeout(() => setCount2((prev) => prev + 1), 100);
    }

    if (count1 >= 10 && count2 >= 11) {
      setTimeout(() => {
        router.push("/start");
      }, 1000); // chờ 3s rồi mới chuyển
    }

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, [count1, count2, router]);

  return (
    <main className="w-screen h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#FEFFF0] ">

      <div className="text-black leading-[1.1] text-[0.5rem] sm:text-[1rem] font-semibold text-right">
        <p className="mb-2">nguyenhuynh</p>
        <p>thao</p>
        <p className="mb-4 text-center">vy</p>

        <div className="flex justify-between w-full px-4">
          <p className="text-sm font-bold text-black tracking-wide">
            .{count1}
          </p>

          <p className="text-sm font-bold text-black tracking-wide">
            .{count2}
          </p>
        </div>
      </div>
    </main>
  );
}
