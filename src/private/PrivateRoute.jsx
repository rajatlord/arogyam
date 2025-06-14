import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/Authcontext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
