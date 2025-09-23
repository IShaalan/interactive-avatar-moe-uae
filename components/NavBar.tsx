"use client";

import Link from "next/link";

import { EduSofxLogo } from "./Icons";

export default function NavBar() {
  return (
    <div className="w-full bg-white border-b border-edusofx shadow-edusofx">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-4">
            <Link className="flex items-center gap-3" href="" target="_blank">
              <EduSofxLogo />
              <div className="h-8 w-px bg-[#EAEAEC]" />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-edusofx-primary">
                  EduSofx Learning Buddy
                </h1>
                <p className="text-sm text-edusofx-green font-medium">
                  Interactive Avatar
                </p>
              </div>
            </Link>
          </div>
          <div className="flex flex-row items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#EAEAEC] rounded-full">
              <div className="w-2 h-2 bg-[#33AA77] rounded-full animate-pulse" />
              <span className="text-sm text-edusofx-dark font-medium">
                Live Session
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
