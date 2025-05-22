import bghome from "../../assets/bghome.jpeg";
import { useState } from "react"; // Line 2 (after your import bghome)
import { useAuth } from "../../Context/Authcontext";
import sky from "../../assets/sky.jpg"

function Greeting({ name }) {
  const { saveMood } = useAuth();
  const [moodText, setMoodText] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  return (
    <section
      className="h-[70vh] md:[70vh] sm:h-[80vh] bg-blue-200 relative -mt-[9rem] z-0 rounded-4xl pt-43 bg-gradient-to-r from-[#FDFCFB] via-[#E2D1F9] to-[#A18CD1] bg-no-repeat bg-cover bg-center mb-5"
      style={{
        backgroundImage: `url(${sky})`,
      }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-4xl z-10"></div>
      <div className="relative z-20 mt-18 md:mt-0">
        <p className=" text-3xl sm:text-6xl md:text-8xl tracking-tighter font-semibold flex justify-center  mb-4 md:mb-15 text-white text-stroke-purple">
          Good morning, {name}
        </p>
        <div className=" flex justify-center">
          <input
            type="text"
            placeholder=" 😀 How's your mood today?"
            value={moodText}
            onChange={(e) => setMoodText(e.target.value)}
            className="bg-white w-[90%] sm:w-[60%] md:w-[60%] h-14 sm:h-16 md:h-18 mb-4 rounded-2xl pl-5 text-xl sm:text-2xl md:text-4xl border-2 border-purple-200 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out "
          />
          {moodText && (
            <button
              onClick={async () => {
                try {
                  await saveMood(moodText, selectedEmoji);
                  alert("Mood saved successfully 🌈");

                  setMoodText("");
                  setSelectedEmoji("");
                } catch (err) {
                  console.error("Error saving mood:", err);
                  alert("Failed to save mood 😔");
                }
              }}
              className="absolute right-[6%] top-[57px] sm:right-[20%] md:right-[21%]  sm:top-2.5 md:top-[164px] bg-sky-300 hover:bg-sky-500 px-6 py-3 md:px-8 md:py-4 sm:px-5 sm:py-2 text-white rounded-xl shadow-md text-sm sm:text-base font-semibold"
            >
              Save Mood
            </button>
          )}
        </div>
        <div className=" flex gap-3 justify-center text-3xl sm:text-2xl md:text-4xl flex-wrap px-4">
          {["😀", "😊", "😣", "😫", "😑"].map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelectedEmoji(emoji)}
              className={`cursor-pointer ${
                selectedEmoji === emoji ? "bg-white/50 rounded-xl px-2" : ""
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Greeting;
