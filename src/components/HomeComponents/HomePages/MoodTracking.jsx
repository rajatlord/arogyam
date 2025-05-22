import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "../../../Context/Authcontext";
import { db } from "../../../Firebase";
import Sentiment from "sentiment";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function MoodTracking() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const { mood } = location.state || {};
  const sentiment = new Sentiment();

  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);

  const fetchMoods = async () => {
    const q = query(collection(db, "moods"), where("userId", "==", currentUser.uid));
    const snapshot = await getDocs(q);
    const moodData = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        const score = sentiment.analyze(data.text || "").score;
        return {
          ...data,
          sentimentScore: score,
          date: new Date(data.time.seconds * 1000).toLocaleDateString(),
        };
      })
      .sort((a, b) => b.time.seconds - a.time.seconds);

    setMoods(moodData);
  };

  const fetchJournals = async () => {
    const q = query(
      collection(db, "journals"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const journalData = snapshot.docs.map((doc) => {
      const data = doc.data();
      const score = sentiment.analyze(data.content || "").score;
      return {
        ...data,
        sentimentScore: score,
        date: data.createdAt?.toDate().toLocaleDateString(),
      };
    });

    setJournals(journalData);
  };

  useEffect(() => {
    if (currentUser) {
      fetchMoods();
      fetchJournals();
    }
  }, [currentUser]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Responsive container */}
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
        {/* Mood History */}
        <Card title="Today's Mood" className="w-full">
          <div className="text-6xl mb-2">{moods[0]?.emoji || "😐"}</div>
          <p className="text-gray-700 mb-5">{moods[0]?.text || "No mood entry found."}</p>
          <p className="text-gray-800 text-3xl mb-2">Past few days mood History</p>
          {moods.length === 0 ? (
            <p>No moods logged yet.</p>
          ) : (
            <div className="space-y-4 max-h-[40vh] overflow-y-auto">
              {moods.map((mood, i) => (
                <div key={i} className="border-b pb-2">
                  <div className="text-3xl">{mood.emoji}</div>
                  <p>{mood.text}</p>
                  <small className="text-gray-500">{mood.date}</small>
                  <p className="text-sm text-gray-600">
                    Sentiment Score: <strong>{mood.sentimentScore}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Mood Chart */}
        <Card title="Mood Sentiment Over Time" className="w-full h-[40vh]">
          {moods.length === 0 ? (
            <p>No mood data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={moods}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[-5, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="sentimentScore" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Journal History */}
        <Card title="Journal History" className="w-full">
          {journals.length === 0 ? (
            <p>No journals yet.</p>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {journals.map((entry, i) => (
                <div key={i} className="border-b pb-2">
                  <p className="text-gray-800">{entry.content}</p>
                  <small className="text-gray-500">{entry.date}</small>
                  <p className="text-sm text-gray-600">
                    Sentiment Score: <strong>{entry.sentimentScore}</strong>
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Journal Chart */}
        <Card title="Journal Sentiment Over Time" className="w-full h-[40vh]">
          {journals.length === 0 ? (
            <p>No journal data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={journals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[-5, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="sentimentScore" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  );
}

// Reusable Card Component
function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default MoodTracking;
