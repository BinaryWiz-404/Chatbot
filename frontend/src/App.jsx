import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import "./App.css";
function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/Home"
          element={<Home />}
        />

         <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/Login"
          element={<Login />}
        />

        <Route
          path="/Signup"
          element={<Signup />}
        />

        <Route
          path="/chat"
          element={<Chat />}
        />
      </Routes>

    </BrowserRouter>
    
  );
}

export default App;