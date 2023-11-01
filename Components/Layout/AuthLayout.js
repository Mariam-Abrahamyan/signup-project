import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-sm bg-dark">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/signup">
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
