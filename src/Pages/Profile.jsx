import { useState, useEffect, useRef } from "react";
import { useAuth } from "../Context/Authcontext";
import { db } from "../Firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { UserCircle } from "lucide-react";

// importing icons
import { User, AtSign, Mail, Lock, Calendar } from "lucide-react";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    age: "",
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const closeRefUpdate = useRef(null);
  const closeRefLogout = useRef(null);

  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        console.log("currentUser: ", currentUser);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            name: data.name || "",
            username: data.username || "",
            age: data.age || "",
            email: data.email || "",
          });
        }
      }
    };
    fetchData();
  }, [currentUser]);

  const handleLogout = () => {
    const auth = getAuth();
    logout(auth)
      .then(() => console.log("Logged out!"))
      .catch((error) => console.error("Logout error:", error));
  };

  // modal closing useEffect
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // If update modal open and click outside it, close update modal
      if (
        isModalOpen &&
        closeRefUpdate.current &&
        !closeRefUpdate.current.contains(e.target)
      ) {
        setIsModalOpen(false);
      }
      // If logout modal open and click outside it, close logout modal
      if (
        isLogoutModalOpen &&
        closeRefLogout.current &&
        !closeRefLogout.current.contains(e.target)
      ) {
        setIsLogoutModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isModalOpen, isLogoutModalOpen]);
  // with esc key 
  const closeModalUpdate = () => setIsModalOpen(false);
const closeModalLogout = () => setIsLogoutModalOpen(false);

useEffect(() => {
  const handleEsc = (e) => {
    if (e.key === "Escape") {
      if (isModalOpen) closeModalUpdate();
      if (isLogoutModalOpen) closeModalLogout();
    }
  };

  window.addEventListener("keydown", handleEsc);
  return () => window.removeEventListener("keydown", handleEsc);
}, [isModalOpen, isLogoutModalOpen]);
useEffect(() => {
  const handleOutsideClick = (e) => {
    if (isModalOpen && closeRefUpdate.current && !closeRefUpdate.current.contains(e.target)) {
      closeModalUpdate();
    }
    if (isLogoutModalOpen && closeRefLogout.current && !closeRefLogout.current.contains(e.target)) {
      closeModalLogout();
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);
  return () => document.removeEventListener("mousedown", handleOutsideClick);
}, [isModalOpen, isLogoutModalOpen]);


  return (
    <section className="bg-[#F9F9F9] min-h-screen flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6 md:p-10 border">
        <div className="text-center text-3xl font-semibold mb-2">Profile</div>
        <p className="text-center text-lg text-gray-600 mb-8">
          Here's what we know about you
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0 w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <UserCircle className="w-24 h-24" />
          </div>

          {/* Display fields */}
          <div className="w-full md:flex-1 grid gap-4">
            <div>
              <label className="text-gray-600 text-sm">Full Name</label>
              <div className="p-3 border rounded-md bg-gray-100 text-gray-800">
                {userData.name}
              </div>
            </div>

            <div>
              <label className="text-gray-600 text-sm">Username</label>
              <div className="p-3 border rounded-md bg-gray-100 text-gray-800">
                {userData.username}
              </div>
            </div>

            <div>
              <label className="text-gray-600 text-sm">Age</label>
              <div className="p-3 border rounded-md bg-gray-100 text-gray-800">
                {userData.age}
              </div>
            </div>

            <div>
              <label className="text-gray-600 text-sm">Email</label>
              <div className="p-3 border rounded-md bg-gray-100 text-gray-800">
                {userData.email}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => setIsModalOpen(true)}
          >
            Details Updation
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
            // onClick={handleLogout}
            onClick={() => setIsLogoutModalOpen(true)}
          >
            Logout
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-500">
          <form
            ref={closeRefUpdate}
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const userRef = doc(db, "users", currentUser.uid);
                await updateDoc(userRef, {
                  name: userData.name,
                  username: userData.username,
                  age: userData.age,
                  email: userData.email,
                });
                console.log("User data updated successfully.");
                setIsModalOpen(false);
              } catch (error) {
                console.error("Error updating user data:", error);
                alert("Something went wrong while updating details.");
              }
            }}
            // from here we can update hegihgt of this modal
            className="bg-white p-6 md:rounded-2xl shadow w-100 md:min-h-[100px] h-[500px]"
          >
            <h2 className="text-3xl md:text-4xl text-center tracking-tight mb-0">
              Update Details
            </h2>
            <h2 className="text-center md:text-xl pt-0 text-[#6e6e80] mb-[40px]">
              Keep your profile up to date
            </h2>

            {/* <div className="flex justify-center py-3">
        <img src={singup} alt="Update" className="h-50 w-50" />
      </div> */}

            <div className="relative">
              <User
                className="absolute left-2 top-[25px] -translate-y-[14px] text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Full Name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full mb-3 p-2 pl-[30px] border rounded-2xl border-gray-300"
                required
              />
            </div>

            <div className="relative">
              <AtSign
                className="absolute left-2 top-[25px] -translate-y-[14px] text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                className="w-full mb-3 p-2 pl-[30px] border rounded-2xl border-gray-300"
                required
              />
            </div>

            <div className="relative">
              <Calendar
                className="absolute left-2 top-[25px] -translate-y-[14px] text-gray-400"
                size={20}
              />
              <input
                type="number"
                placeholder="Age"
                value={userData.age}
                onChange={(e) =>
                  setUserData({ ...userData, age: e.target.value })
                }
                className="w-full mb-3 p-2 pl-[30px] border rounded-2xl border-gray-300"
                required
              />
            </div>

            <div className="relative">
              <Mail
                className="absolute left-2 top-[25px] -translate-y-[14px] text-gray-400"
                size={20}
              />
              <input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full mb-3 p-2 pl-[30px] border rounded-2xl border-gray-300"
                required
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-2 text-sm hover:text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl transition text-white p-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* logout modal up  */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-2xl shadow max-w-sm w-full
    "
            ref={closeRefLogout}
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Confirm Logout
            </h2>
            <p className="text-center mb-6">
              Are you sure you want to logout? We’ll miss you!
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  handleLogout();
                }}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
