import { createContext, useContext, useEffect, useState } from "react";
import { updateDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore"; // 👉 for adding mood entries

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// importing journal feature and context
import {
  addJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
  fetchJournalEntries,
} from "./journalService";

// 1.creating context
const AuthContext = createContext();

// 2. custom hook
export const useAuth = () => useContext(AuthContext);

// 3. create provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // signup
  const signup = async (email, password, name, age, username) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      age,
      username,
      email,
      createdAt: new Date(),
    });
    return user;
  };

  // login in
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // log out
  const logout = () => signOut(auth);

  const updateProfile = async (uid, data) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
  };

  // save user's mood to Firestore
  const saveMood = async (moodText, emoji) => {
    if (!currentUser) return;

    const moodData = {
      text: moodText,
      emoji: emoji || "",
      time: new Date(),
      userId: currentUser.uid,
    };

    try {
      await addDoc(collection(db, "moods"), moodData);
    } catch (err) {
      console.error("Failed to save mood", err);
      throw err;
    }
  };

  // journal feature functions
  const addJournal = (entry) => addJournalEntry(currentUser, entry);
  const updateJournal = (id, data) => updateJournalEntry(id, data);
  const deleteJournal = (id) => deleteJournalEntry(id);
  const fetchJournals = (filters) => fetchJournalEntries(currentUser, filters);

  // listen to user auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateProfile,
    saveMood,
    addJournal,
    updateJournal,
    deleteJournal,
    fetchJournals,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
