// import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";
function Home() {
  return (
    <div>
      <Navbar />

      <div className="home-container">
        <h1>Welcome to Matri </h1>
        <div className="home-para">
          <p>
            Your intelligent AI assistant for chatting, coding, learning, and
            productivity.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
