"use client";

import Header from "@/components/misc/Header";
import { LoadingProps } from "@/types";

export default function Loading(props: LoadingProps) {
  return (
    <>
      {(props.headless || false) ? null : <Header />}
      <div className="flex justify-center items-center w-full h-full">
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    </>
  );
}
