// import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {

  return (
    <div>

      <Navbar />

      <div className="home-container">

        <h1>Welcome to Matri </h1>
        <p>
          Your intelligent AI assistant for chatting,
          coding, learning, and productivity.
        </p>
      </div>
  </div>
  );
}

export default Home;