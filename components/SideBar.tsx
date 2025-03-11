"use client";

import NewDocumentButton from "./NewDocumentButton";
import { Menu } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, where, query, DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOptions from "./SidebarOptions";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
  id?: string;
}

function SideBar() {
  const { user } = useUser();

  // State to store grouped documents
  const [groupedData, setGroupedData] = useState<{ owner: RoomDocument[]; editor: RoomDocument[] }>({
    owner: [],
    editor: [],
  });

  // Get user email safely
  const userEmail = user?.emailAddresses[0]?.toString();
  console.log("User Email:", userEmail); // Debugging user email

  // Firestore Query
  const [data, loading, error] = useCollection(
    userEmail ? query(collectionGroup(db, "rooms"), where("userId", "==", userEmail)) : null
  );

  // Debugging fetched Firestore data
  useEffect(() => {
    if (!data) return;
    console.log("Fetched Data:", data.docs.map((doc) => doc.data())); // Logs raw data from Firestore

    // Process and group data
    const grouped = data.docs.reduce<{ owner: RoomDocument[]; editor: RoomDocument[] }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        console.log("Processing document:", roomData); // Debugging each document

        if (roomData.role === "owner") {
          acc.owner.push({ id: curr.id, ...roomData });
        } else {
          acc.editor.push({ id: curr.id, ...roomData });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );

    console.log("Updated groupedData:", grouped); // Logs final grouped data
    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />
      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-500 text-xs font-thin">No documents found.</h2>
        ) : (
          <>
            <h2 className="text-gray-500 text-xs font-thin">My Documents</h2>
            {groupedData.owner.map((doc) => (
              <SidebarOptions key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}
      </div>
      {groupedData.editor.length > 0 && (
        <>
          <h2 className="text-gray-500 text-xs font-thin">Shared with me</h2>
          {groupedData.editor.map((doc) => (
            <SidebarOptions key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
          ))}
        </>
      )}
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}

export default SideBar;