"use client";  // ✅ Ensure this is a Client Component

import { Button } from "./ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";  // ✅ Use next/navigation instead
import { createNewDocument } from "@/actions/actions";

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);  
    });
  };                                         

  return (
    <div>
      <Button onClick={handleCreateNewDocument} disabled={isPending}>
        {isPending ? "Creating.." : "New Document"}
      </Button>
    </div>
  );
}

export default NewDocumentButton;
