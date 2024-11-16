"use client";

import Header from "@/components/blocks/home/Header";

export default function Loading() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center w-full h-full">
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    </>
  );
}
