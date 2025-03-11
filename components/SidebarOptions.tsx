'use client';

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SidebarOptions({ href, id }: { href: string; id: string }) {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  if (loading) return <p className="text-gray-500 text-sm">Loading...</p>;
  if (error) return <p className="text-red-500 text-sm">Error loading document</p>;
  if (!data) return null;

  return (
    <Link
      href={href}
      className={`flex items-center p-3 rounded-lg transition-all duration-200 
        ${isActive ? "bg-gray-300 font-semibold text-black border-2 border-black" : "bg-white text-gray-700 border border-gray-300"} 
        hover:bg-gray-200 hover:border-gray-500 focus:ring-2 focus:ring-gray-500`}
    >
      <p className="truncate text-sm">{data?.title}</p>
    </Link>
  );
}

export default SidebarOptions;
