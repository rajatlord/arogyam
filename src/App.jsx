import { Route, Routes, Navigate  } from "react-router-dom";
// use 
import { useAuth } from "./Context/Authcontext";

// private things 
import "./App.css";

// Landing layouts
import Landing from "./Pages/Landing";
import PrivateRoute from "./private/PrivateRoute";
import HomeLayout from "./layout/HomeLayout";

//protected pages
import Journal from "./components/HomeComponents/HomePages/Journal";
import FormScore from "./components/HomeComponents/HomePages/FormScore";
import MoodTracking from "./components/HomeComponents/HomePages/MoodTracking";
import Questionnaires from "./components/HomeComponents/HomePages/Questionnaires";
import Ventout from "./components/HomeComponents/HomePages/Ventout";
import Faq from "./Pages/Faq";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";


function App() {
  const { currentUser }= useAuth();
  return (
   <Routes>
     <Route path="/" element={currentUser ? <Navigate to="/home" /> : <Landing />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomeLayout />
          </PrivateRoute>
        }
      >
       <Route path="home" element={<Home />} />
        <Route path="journal" element={<Journal />} />
        <Route path="mood-tracking" element={<MoodTracking />} />
        <Route path="ventout" element={<Ventout />} />
        <Route path="form-score" element={<FormScore />} />
        <Route path="questionnaires" element={<Questionnaires />} />
        <Route path="faq" element={<Faq />} />
        <Route path="profile" element={<Profile />} />
        </Route>
    </Routes>
  );
}

export default App;
