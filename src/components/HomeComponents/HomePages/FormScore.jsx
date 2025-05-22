// FormScore.jsx
import { useState, useEffect } from "react";
import { ArrowRight, Info, BookOpen, ArrowLeft } from "lucide-react";

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself – or that you are a failure",
  "Trouble concentrating on things, such as reading or watching TV",
  "Moving or speaking so slowly others notice, or being fidgety",
  "Thoughts that you'd be better off dead, or of hurting yourself"
];

const gad7Questions = [
  "Feeling nervous, anxious or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen"
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 }
];

function AssessmentForm({ questions, onSubmit }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [currentQ, setCurrentQ] = useState(0);
  const [error, setError] = useState("");

  const handleSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = value;
    setAnswers(newAnswers);
    setError("");
    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ((prev) => prev + 1), 200);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      setError("Please answer all questions");
      return;
    }
    const total = answers.reduce((sum, val) => sum + val, 0);
    onSubmit(total);
  };

  return (
    <div className="space-y-6 p-4 animate-fade-in">
      <p className="text-lg font-semibold">{questions[currentQ]}</p>
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className={`rounded-xl border border-gray-300 p-3 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              answers[currentQ] === opt.value ? "bg-blue-100 font-medium" : ""
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-between items-center mt-4">
        {currentQ > 0 && (
          <button
            onClick={handleBack}
            className="text-sm text-blue-500 hover:underline flex items-center gap-1"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}
        {currentQ === questions.length - 1 && (
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

function Result({ score, type, onReset }) {
  let severity = "";
  let suggestion = "";

  const levels = {
    PHQ9: ["Minimal", "Mild", "Moderate", "Moderately severe", "Severe"],
    GAD7: ["Minimal", "Mild", "Moderate", "Severe"]
  };

  if (type === "PHQ9") {
    if (score <= 4) severity = levels.PHQ9[0];
    else if (score <= 9) severity = levels.PHQ9[1];
    else if (score <= 14) severity = levels.PHQ9[2];
    else if (score <= 19) severity = levels.PHQ9[3];
    else severity = levels.PHQ9[4];
  } else {
    if (score <= 4) severity = levels.GAD7[0];
    else if (score <= 9) severity = levels.GAD7[1];
    else if (score <= 14) severity = levels.GAD7[2];
    else severity = levels.GAD7[3];
  }

  if (severity === "Minimal") suggestion = "Keep maintaining healthy habits.";
  else if (severity === "Mild") suggestion = "Try journaling or daily walks.";
  else if (severity === "Moderate") suggestion = "Consider talking to a therapist.";
  else suggestion = "Seek professional mental health support.";

  return (
    <div className="p-6 space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold">Your {type} Score: {score}</h2>
      <p className={`text-lg font-semibold ${score >= 15 ? "text-red-600" : score >= 10 ? "text-yellow-500" : "text-green-600"}`}>
        Severity: {severity}
      </p>
      <p className="text-gray-700">Suggestion: {suggestion}</p>
      <button onClick={onReset} className="mt-4 underline text-blue-500 hover:text-blue-700">Start Over</button>

      <div className="mt-10 border-t pt-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Additional Resources
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>
            <a href="https://www.phqscreeners.com/images/sites/g/files/g10060481/f/201412/PHQ-9%20Scoring%20Instructions.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              PHQ-9 Scoring and Interpretation Guide
            </a>
          </li>
          <li>
            <a href="https://www.phqscreeners.com/images/sites/g/files/g10060481/f/201412/GAD-7%20Scoring%20Instructions.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              GAD-7 Scoring Guide
            </a>
          </li>
          <li>
            <a href="https://www.icsi.org/wp-content/uploads/2020/07/PHQ9Guide.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Interpreting PHQ-9 Scores
            </a>
          </li>
          <li>
            <a href="https://adaa.org/sites/default/files/GAD-7_Anxiety-updated_0.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Interpreting GAD-7 Scores
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function FormScore() {
  const [formType, setFormType] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fade-in {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fade-in 0.6s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const reset = () => {
    setScore(null);
    setFormType(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">Mental Health Assessment</h1>

      {!formType && (
        <div className="space-y-4 w-full max-w-md">
          <button onClick={() => setFormType("PHQ9")} className="w-full bg-white shadow p-4 rounded-xl hover:bg-blue-50">
            Start Depression Test (PHQ-9)
          </button>
          <button onClick={() => setFormType("GAD7")} className="w-full bg-white shadow p-4 rounded-xl hover:bg-green-50">
            Start Anxiety Test (GAD-7)
          </button>
        </div>
      )}

      {formType && score === null && (
        <AssessmentForm
          questions={formType === "PHQ9" ? phq9Questions : gad7Questions}
          onSubmit={(score) => setScore(score)}
        />
      )}

      {score !== null && (
        <Result score={score} type={formType} onReset={reset} />
      )}
    </div>
  );
}
