import { Outlet } from "react-router-dom";
import NavbarAfterLogin from "../components/NavbarAfterLogin";

function HomeLayout() {
  return (
    <>
      
      <main>
        <NavbarAfterLogin />
        <Outlet />
      </main>
    </>
  );
}

export default HomeLayout;
