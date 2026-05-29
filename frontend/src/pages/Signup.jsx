import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {

    try {

      await axios.post(
        "https://chatbot-backend-47u7.onrender.com/signup",
        {
          username,
          email,
          password,
        }
      );

      alert("Signup successful");

      navigate("/chat");

    } catch (error) {

      console.error(error);

      alert("Signup failed");

    }
  };

  return (
  

    <div className="auth-container">

      <div className="auth-box">

        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          Signup
        </button>

        <p>
          Already have an account?
          <Link to="/"> Login</Link>
        </p>

      </div>

    </div>
   
  );
}

export default Signup;