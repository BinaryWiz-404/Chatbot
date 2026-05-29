import { Link } from "react-router-dom";
function Navbar() {

  return (
    <nav className="navbar">

      <h1>Matri </h1>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/login">Login</Link>

        <Link to="/signup">Signup</Link>

      </div>

    </nav>
  );
}

export default Navbar;