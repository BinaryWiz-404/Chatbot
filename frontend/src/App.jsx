import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

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
        "https://chatbot-backend.onrender.com/chat",
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

  return (
    <div className="app">
      <div className="chat-container">

        <h1>AI Chatbot</h1>

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

export default App;