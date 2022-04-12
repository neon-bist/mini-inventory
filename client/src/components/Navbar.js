import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { toggleSidebar, logoutUser, user } = useAppContext();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo /> 
           <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className="dropdown">
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
