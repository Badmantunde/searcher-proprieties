"use client";

import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: Props) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page-enter min-w-0 overflow-x-hidden">
      {children}
    </div>
  );
}
