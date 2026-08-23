"use client";

import Image from "next/image";

export default function BackgroundTrees() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] opacity-10">
      <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] min-w-[300px] min-h-[300px] -rotate-12">
        <Image src="/logo.png" alt="" fill className="object-cover" />
      </div>
      
      <div className="absolute top-[30%] -right-[15%] w-[60vw] h-[60vw] min-w-[400px] min-h-[400px] rotate-45">
        <Image src="/logo.png" alt="" fill className="object-cover" />
      </div>
      
      <div className="absolute -bottom-[15%] -left-[5%] w-[40vw] h-[40vw] min-w-[250px] min-h-[250px] rotate-90">
        <Image src="/logo.png" alt="" fill className="object-cover" />
      </div>
    </div>
  );
}
