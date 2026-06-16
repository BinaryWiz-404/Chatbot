import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      <h1>Matri </h1>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link className="nav-auth" to="/login">
          Login
        </Link>

        <Link className="nav-auth" to="/signup">
          Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
