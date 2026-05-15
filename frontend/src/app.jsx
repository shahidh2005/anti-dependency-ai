import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await response.json();

      const aiMessage = {
        role: "ai",
        text: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
    }

    setInput("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AntiDependency AI</h1>

      <p style={styles.subtitle}>
        AI that strengthens human thinking instead of replacing it.
      </p>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf:
                msg.role === "user"
                  ? "flex-end"
                  : "flex-start",

              background:
                msg.role === "user"
                  ? "#2563eb"
                  : "#1e293b",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />

        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    fontSize: "40px",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: "30px",
  },

  chatBox: {
    flex: 1,
    backgroundColor: "#111827",
    borderRadius: "12px",
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  message: {
    maxWidth: "70%",
    padding: "15px",
    borderRadius: "12px",
    lineHeight: "1.5",
  },

  inputArea: {
    display: "flex",
    marginTop: "20px",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    outline: "none",
  },

  button: {
    padding: "15px 25px",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default App;
