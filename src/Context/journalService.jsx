// journalService.js
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../Firebase"; // adjust path as needed

export const addJournalEntry = async (currentUser, entry) => {
  if (!currentUser) return;
  const journalData = {
    ...entry, // { title, content, category, date }
    userId: currentUser.uid,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await addDoc(collection(db, "journals"), journalData);
  } catch (err) {
    console.error("Failed to add journal entry", err);
    throw err;
  }
};

export const updateJournalEntry = async (entryId, updatedData) => {
  try {
    const entryRef = doc(db, "journals", entryId);
    await updateDoc(entryRef, {
      ...updatedData,
      updatedAt: new Date(),
    });
  } catch (err) {
    console.error("Failed to update journal entry", err);
    throw err;
  }
};

export const deleteJournalEntry = async (entryId) => {
  try {
    const entryRef = doc(db, "journals", entryId);
    await deleteDoc(entryRef);
  } catch (err) {
    console.error("Failed to delete journal entry", err);
    throw err;
  }
};

export const fetchJournalEntries = async (currentUser, filters = {}) => {
  if (!currentUser) return [];
  try {
    let q = query(
      collection(db, "journals"),
      where("userId", "==", currentUser.uid)
    );

    if (filters.category) {
      q = query(q, where("category", "==", filters.category));
    }

    if (filters.startDate && filters.endDate) {
      q = query(
        q,
        where("createdAt", ">=", filters.startDate),
        where("createdAt", "<=", filters.endDate)
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Failed to fetch journal entries", err);
    throw err;
  }
};
