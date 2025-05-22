import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  RiHome2Line,
  RiHome2Fill,
  RiUserLine,
  RiUserFill,
  RiBookFill,
  RiBookLine,
} from "react-icons/ri";

function NavbarAfterLogin() {
  const { pathname } = useLocation();

  return (
    <nav className="px-0 md:px-4 py-3 border-b border-gray-200 z-1000 relative bg-[#F9F9F9]" >
      <div className=" hidden md:flex max-w-3xl items-center justify-between mx-auto bg-white/80 backdrop-blur rounded-full shadow-md  h-12">
      <Link to="home" >
        <img src={logo} alt="logo" className="h-8 pl-5" />
  </Link>
        <div className="flex gap-6 text-gray-700 font-medium">
          <div className="flex justify-center gap-4 mr-6 items-center">
            <Link to="home" className="flex gap-2 items-center  ">
              {pathname === "/home" ? (
                <RiHome2Fill size={20} />
              ) : (
                <RiHome2Line size={20} />
              )}
              <span className="text-1xl mt-1">Home</span>
            </Link>
            <Link to="faq" className="flex gap-2 items-center  ">
              {pathname === "/faq" ? (
                <RiBookFill size={20} />
              ) : (
                <RiBookLine size={20} />
              )}
              <span className="text-1xl mt-1">Faq</span>
            </Link>
            <Link to="profile" className="flex gap-2 items-center ">
              {pathname === "/profile" ? (
                <RiUserFill size={20} />
              ) : (
                <RiUserLine size={20} />
              )}
              <span className="text-1xl mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </div>
      {/* mobile navbar */}
      <div className="md:hidden z-50">
        {/* top logo */}
        <div className="flex gap-2 items-center h-12 bg-white w-full ">
          <img src={logo} alt="Logo" className="h-12" />
          <p> Arogyam</p>
        </div>
        {/* links */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 shadow-md z-50 ">
          <Link
            to="faq"
            className="  p-3 rounded-md hover:bg-gray-100 active:scale-90 active:bg-gray-200 transition-transform duration-150 "
          >
            {pathname === "/faq" ? (
              <RiBookFill size={20} />
            ) : (
              <RiBookLine size={20} />
            )}
          </Link>
          <Link
            to="home"
            className="  p-3 rounded-md hover:bg-gray-100 active:scale-90 active:bg-gray-200 transition-transform duration-150"
          >
            {pathname === "/home" ? (
              <RiHome2Fill size={20} />
            ) : (
              <RiHome2Line size={20} />
            )}
          </Link>

          <Link
            to="profile"
            className="  p-3 rounded-md hover:bg-gray-100 active:scale-90 active:bg-gray-200 transition-transform duration-150"
          >
            {pathname === "/profile" ? (
              <RiUserFill size={20} />
            ) : (
              <RiUserLine size={20} />
            )}
          </Link>

          {/* <a className="text-3xl text-gray-700 font-medium" href="#">
            FAQ
          </a>
          <a className="text-3xl text-gray-700 font-medium" href="#">
            Home
          </a>
          <a className="text-3xl text-gray-700 font-medium" href="#">
            Profile
          </a> */}
        </div>
      </div>
    </nav>
  );
}

export default NavbarAfterLogin;
