import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Axios } from "../../Axios";

const ProfileLayout = () => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("auth").then((result) => {
      if (!result.data.user) {
        navigate("/");
      } else {
        setAccount(result.data.user);
      }
      console.log(result.data);
    });
  }, []);
  const handleLogout = () => {
    Axios.get("logout").then((r) => {
      setAccount(null);
      navigate("/");
    });
  };
  return !account ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div>
        <nav className="navbar navbar-expand-sm bg-dark">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/profile">
                  profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/profile/settings">
                  settings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/profile/search">
                  search
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link text-white">
                  logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <Outlet context={{ account }} />
    </div>
  );
};
export default ProfileLayout;
