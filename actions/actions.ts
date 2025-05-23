"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
    auth.protect();

    const { sessionClaims } = await auth();

    const docsCollectionRef = adminDb.collection("documents");

    const docRef = await docsCollectionRef.add({
        title: "New Doc"
    });
    // sessionClaims?.email!
    await adminDb
        .collection("users")
        .doc(sessionClaims?.email!)
        .collection("rooms")
        .doc(docRef.id)
        .set({
            userId: sessionClaims?.email!,
            role: "owner",
            createdAt: new Date(),
            roomId: docRef.id,
        });
    
        return {docId: docRef.id}
}

