// import LoginModal from "../components/LoginModal";
// import NavbarBeforeLogin from "../components/NavbarBeforeLogin";
// import Greeting from "../components/HomeComponents/Greeting";
import { Outlet , useLocation , useNavigate} from "react-router-dom";
import Greeting from "../components/HomeComponents/Greeting";
import FeatureCard from "../components/HomeComponents/FeatureCard";

// getting user name 
import { getDoc, doc } from "firebase/firestore";
import { useState , useEffect } from "react";
import { useAuth } from "../Context/Authcontext";
import { db } from "../Firebase";

function Home() {
  
  const location = useLocation();
  const isRoot = location.pathname === "/home";
  const [name , setName] = useState("name");
   const { currentUser} = useAuth();
  
   useEffect(() => {
      const fetchData = async () => {
        if (currentUser) {
          const userRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
              console.log("User data:", data); 
            setName(data.name);
          }
        }
      };
      fetchData();
    }, [currentUser]);

  
  return (
    <div>
      {isRoot ? (
         <>
      <Greeting name={name} />
      <div className="flex flex-wrap mb-3  md:flex-nowrap md:gap-5 md:mb-5 items-center justify-center gap-3 bg-[#F9F9F9]">
        
        <FeatureCard
          title="Journal"
          subtitle="Last edited: 7 Dec, 24"
          to="/journal"
          bgColor="bg-[#6DE1D2] hover:bg-[#6DE1D2] md:bg-[#C9F2EE] md:hover:bg-[#6DE1D2] text-black"
        />

        <FeatureCard
          title="Mood Tracking"
          to="/mood-tracking"
          bgColor="bg-[#FFA955]"
        />
      </div>
      <div className="flex flex-wrap mb-3 md:gap-5 md:mb-5 items-center justify-center gap-3">
        <FeatureCard
          title="Ventout zone"
          to="/ventout"
          bgColor="bg-[#FFD63A]"
        />
        <FeatureCard
          title="Form score"
          to="/form-score"
          bgColor="bg-[#6DE1D2]"
        />
      </div>
      <div className="flex flex-wrap md:gap-5 mb-[20px] md:mb-5 items-center justify-center gap-3">
        <FeatureCard
          title="Questionnaires"
          subtitle="Last edited: 18 Dec, 24"
          to="/faq"
          bgColor="bg-[#F75A5A]"
        />
      </div>
    </>):(<Outlet />)}
      
    </div>
    
  );
}

export default Home;
