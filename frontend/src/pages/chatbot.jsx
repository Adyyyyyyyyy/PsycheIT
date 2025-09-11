

import React, { useState, useRef, useEffect } from "react";
import "./chatbot.css";
import Navbar from "../Navbar";

export default function Chatbot() {
  // Dummy previous chat history
  const [history, setHistory] = useState([
    { id: 1, title: "Chat on 10 Sep", messages: [
      { sender: "bot", text: "Hi 👋 I'm your mental health buddy. What's on your mind?" },
      { sender: "user", text: "I can't sleep" },
      { sender: "bot", text: "Sleep issues affect focus. Try a wind-down routine and calming audio before bed." }
    ] },
    { id: 2, title: "Chat on 9 Sep", messages: [
      { sender: "bot", text: "Hi 👋 I'm your mental health buddy. What's on your mind?" },
      { sender: "user", text: "Exam stress" },
      { sender: "bot", text: "Exams/study stress is common. Try breaking tasks into 25-min slots and taking short walks." }
    ] }
  ]);
  const [activeHistory, setActiveHistory] = useState(history[0].id);
  const [messages, setMessages] = useState(history[0].messages);
  const [input, setInput] = useState("");
  const [anonId] = useState(() => localStorage.getItem("anonId") || `Student#${Math.floor(Math.random()*9000)+1000}`);
  const scrollRef = useRef();

  useEffect(() => {
    localStorage.setItem("anonId", anonId);
  }, [anonId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Switch chat history
  const handleHistoryClick = (id) => {
    setActiveHistory(id);
    const selected = history.find(h => h.id === id);
    setMessages(selected ? selected.messages : []);
  };

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // call backend classifier
    try {
      const res = await fetch("http://localhost:5000/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      const intent = data.intent || "general";

      // map intent -> friendly response + tips
      const intentMap = {
        depression: {
          reply: "I'm sorry you're feeling this way. It might help to talk to a trusted person or try a short walk.",
          tips: ["Talk to a friend", "Short walk", "5 deep breaths"]
        },
        academic: {
          reply: "Exams/study stress is common. Try breaking tasks into 25-min slots and taking short walks.",
          tips: ["Pomodoro 25/5", "Short walk", "5 deep breaths"]
        },
        family: {
          reply: "Family conflicts are tough. Journaling and talking to a trusted person can help.",
          tips: ["Write your feelings", "Talk to a friend", "Book a counselor"]
        },
        social: {
          reply: "Feeling lonely or relationship trouble is painful. You can try our peer forum or a short check-in.",
          tips: ["Post anonymously to peer forum", "Short breathing exercise"]
        },
        sleep: {
          reply: "Sleep issues affect focus. Try a wind-down routine and calming audio before bed.",
          tips: ["No screens 1 hour before bed", "Calming audio (5min)"]
        },
        anxiety: {
          reply: "Anxiety can be overwhelming. Let's try a grounding exercise: name 5 things you can see.",
          tips: ["5-4-3-2-1 grounding", "Slow breathing"]
        },
        highrisk: {
          reply: "I’m concerned for you. If you are in immediate danger call emergency services now. You can also call 9152987821 (Kiran Helpline). Do you want me to book a counselor now?",
          tips: []
        },
        general: {
          reply: "Thanks for sharing — it's good to check in. Would you like a short coping tip or to browse resources?",
          tips: ["Daily check-in", "Short breathing exercise"]
        },
        greeting: {
          reply: "I’m here to listen. Can you tell me more about how you feel?",
          tips: []
        },
        counselor:{
          reply: "I can help you book a session with a counselor. Please visit the 'Book Counselor' section to schedule an appointment.",
          tips: ["Visit 'Book Counselor' section"]
        }
      };

      const mapped = intentMap[intent] || intentMap.general;
      setMessages(prev => [...prev, { sender: "bot", text: mapped.reply, meta: { intent, tips: mapped.tips } }]);

    } catch (e) {
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I couldn't connect to the classifier. Try again." }]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="chatbot-main">
        <aside className="chatbot-sidebar">
          <div className="sidebar-title">Previous Chats</div>
          <div className="chat-history-list">
            {history.map(h => (
              <div
                key={h.id}
                className={`chat-history-item${activeHistory === h.id ? " active" : ""}`}
                onClick={() => handleHistoryClick(h.id)}
              >
                {h.title}
              </div>
            ))}
          </div>
        </aside>
        <main className="chatbot-content">
          <div className="chatbot-card">
            <div className="chatbot-header">
              <span className="chatbot-title">SHANTI — Mental Health Buddy</span>
              <span className="user-id">{anonId}</span>
            </div>
            <div className="chatbot-messages" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`message ${m.sender === "bot" ? "bot-message" : "user-message"}`}>
                  <div className="message-content">
                    <div className="message-text">{m.text}</div>
                    {m.meta?.tips && m.meta.tips.length > 0 && (
                      <div className="message-tips">
                        <strong>Try:</strong>
                        <ul>
                          {m.meta.tips.map((t, idx) => <li key={idx}>{t}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="chatbot-input-container">
              <input
                className="chatbot-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type how you feel (e.g., 'can't sleep', 'exam stress')"
                onKeyDown={e => e.key === "Enter" && send()}
              />
              <button className="chatbot-send-button" onClick={send}>Send</button>
            </div>
            <div className="chatbot-disclaimer">
              Note: This is first-aid only — not a diagnosis. For emergencies call local services or 9152987821.
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
