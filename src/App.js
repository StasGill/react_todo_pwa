// src/App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import InstallPrompt from "./InstallPrompt";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installPromptOpen, setInstallPromptOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallPromptOpen(true);
    });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, input]);
    setInput("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleInstallClose = () => {
    setInstallPromptOpen(false);
  };

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setDeferredPrompt(null);
        setInstallPromptOpen(false);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>DoThat</h1>
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              <button onClick={() => deleteTodo(index)}>X</button>
            </li>
          ))}
        </ul>
        <InstallPrompt
          open={installPromptOpen}
          onClose={handleInstallClose}
          onInstall={handleInstall}
        />
      </header>
    </div>
  );
}

export default App;
