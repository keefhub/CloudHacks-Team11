import React, { useState, useEffect } from "react";
import axios from "axios";
import "/home/john/CloudHacks-Team11/frontend/cloudhacks-2023/src/App.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const sendQueryToBackend = (query) => {
    axios
      .post("http://localhost:5000/api/query", { query })
      .then((response) => {
        const apiResponse = response.data.output;
        const botResponse = {
          text: apiResponse,
          sender: "bot",
        };

        setMessages((prevMessages) => [...prevMessages, botResponse]);
      })
      .catch((error) => {
        console.error("Error sedning query", error);
      });
  };

  const handleUserInput = (inputText) => {
    const userMessage = {
      text: inputText,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    sendQueryToBackend(inputText);

    const botResponse = {
      text: "Typing...",
      sender: "bot",
    };
    setMessages((prevMessages) => [...prevMessages, botResponse]);

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 800);
  };

  useEffect(() => {
    // Simulate initial bot response
    const botResponse = {
      text: "Hello, how can I assist you?",
      sender: "bot",
    };
    setMessages([botResponse]);
  }, []);

  return (
    <div className="chatbox-container">
      <p>
        Final Step:
        <span style={{ fontSize: "25px", fontWeight: "bold" }}>
          Input your questions here
        </span>{" "}
      </p>

      <div className="chatbox">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "bot" ? "bot" : "user"}`}
          >
            {message.sender === "bot" ? "bot: " : "user: "}
            {message.text}
          </div>
        ))}
      </div>
      <input
        className="chatbox-input"
        type="text"
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            handleUserInput(e.target.value.trim());
            e.target.value = "";
          }
        }}
      />
    </div>
  );
};

export default Chatbot;
