import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useAuth } from "../../../Context/Authcontext";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../Firebase";

export default function Journal() {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [newEntry, setNewEntry] = useState({ content: "", category: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchEntries = async () => {
    if (!currentUser) return;

    setLoading(true);

    try {
      const q = query(
        collection(db, "journals"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
        limit(50)
      );

      const querySnapshot = await getDocs(q);
      const fetchedEntries = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEntries(fetchedEntries);
      setFilteredEntries(fetchedEntries);
    } catch (error) {
      console.error("Failed to fetch journal entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [currentUser]);

  useEffect(() => {
    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      setFilteredEntries(
        entries.filter((entry) =>
          entry.content.toLowerCase().includes(lowerSearch)
        )
      );
    } else {
      setFilteredEntries(entries);
    }
  }, [search, entries]);

  const saveEntry = async () => {
    if (!newEntry.content.trim()) {
      if (editingId) {
        setEditingId(null);
        setNewEntry({ content: "", category: "" });
        return;
      } else {
        alert("Content can't be empty");
        return;
      }
    }

    if (!currentUser) return;

    try {
      if (editingId) {
        const docRef = doc(db, "journals", editingId);
        await updateDoc(docRef, {
          content: newEntry.content,
          category: newEntry.category,
          updatedAt: Timestamp.now(),
        });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "journals"), {
          userId: currentUser.uid,
          content: newEntry.content,
          category: newEntry.category,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      }
      setNewEntry({ content: "", category: "" });
      fetchEntries();
    } catch (error) {
      console.error("Failed to save entry:", error);
    }
  };

  const deleteEntry = async (id) => {
    if (!window.confirm("Delete this journal entry?")) return;

    try {
      await deleteDoc(doc(db, "journals", id));
      fetchEntries();
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="bg-gray-100 p-4 rounded-lg shadow max-h-[500px] overflow-y-auto lg:w-1/3">
          <h2 className="text-lg font-bold mb-4">Recent Entries</h2>
          {loading ? (
            <p>Loading...</p>
          ) : filteredEntries.length === 0 ? (
            <p>No entries found.</p>
          ) : (
            <ul className="space-y-4">
              {filteredEntries.map(({ id, content, createdAt }) => (
                <li
                  key={id}
                  className="p-4 bg-white shadow rounded-lg flex flex-col gap-2"
                >
                  <div className="text-sm text-gray-500">
                    {createdAt?.toDate().toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      weekday: "long",
                    })}
                  </div>
                  <div className="text-gray-800 line-clamp-2">{content}</div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        setEditingId(id);
                        setNewEntry({ content, category: "" });
                      }}
                      className="text-blue-600 underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEntry(id)}
                      className="text-red-600 underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Main Section */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="search"
                placeholder="Search entries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 p-2 border rounded-lg text-lg"
              />
            </div>
            <input
              type="date"
              className="p-2 border rounded-lg w-full sm:w-auto"
              onChange={(e) => console.log(e.target.value)}
            />
          </div>

          <div className="bg-white shadow p-6 rounded-lg">
            <textarea
              rows={10}
              placeholder="What did you do for today?"
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              className="w-full p-2 border rounded mb-4 resize-none"
            />
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="Category (e.g., Work, Personal)"
                value={newEntry.category}
                onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={saveEntry}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
              >
                {editingId ? "Update Entry" : "Start an Entry"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}