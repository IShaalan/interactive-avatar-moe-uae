"use client";

import InteractiveAvatar from "@/components/InteractiveAvatar";

export default function App() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-6xl">
          <InteractiveAvatar />
        </div>
      </div>
    </div>
  );
}
