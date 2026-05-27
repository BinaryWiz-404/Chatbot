import { useState } from "react";
import axios from "axios";

function Chat() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    setLoading(true);

    try {

      const response = await axios.post(
        "https://chatbot-backend-47u7.onrender.com/chat",
        {
          message: currentMessage,
        }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };

      setChat((prev) => [...prev, botMessage]);

    } catch (error) {

      console.error(error);

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Error connecting to backend.",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };

  const logout = () => {

    localStorage.removeItem("username");

    window.location.href = "/";

  };

  return (
    <div className="app">

      <div className="chat-container">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            background: "#1e293b",
            color: "white",
          }}
        >

          <h2>
            Welcome, {username}
          </h2>

          <button
            onClick={logout}
            style={{
              width: "100px",
              padding: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>

        </div>

        <div className="chat-box">

          {chat.map((msg, index) => (

            <div
              key={index}
              className={
                msg.sender === "user"
                  ? "message user"
                  : "message bot"
              }
            >
              {msg.text}
            </div>

          ))}

          {loading && (

            <div className="message bot">
              Typing...
            </div>

          )}

        </div>

        <div className="input-area">

          <input
            type="text"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                sendMessage();

              }

            }}
          />

          <button onClick={sendMessage}>
            Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;