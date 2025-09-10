// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm your mental health buddy. What's on your mind?" }
  ]);
  const [input, setInput] = useState("");
  const [anonId] = useState(() => localStorage.getItem("anonId") || `Student#${Math.floor(Math.random()*9000)+1000}`);
  const scrollRef = useRef();

  useEffect(() => {
    localStorage.setItem("anonId", anonId);
  }, [anonId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

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
          
        }
      };

      const mapped = intentMap[intent] || intentMap.general;
      setMessages(prev => [...prev, { sender: "bot", text: mapped.reply, meta: { intent, tips: mapped.tips } }]);

    } catch (e) {
      setMessages(prev => [...prev, { sender: "bot", text: "Sorry, I couldn't connect to the classifier. Try again." }]);
    }
  };

  return (
    <div className="chatbot-card" style={{ maxWidth: 540, margin: "16px auto", background:"#fff", padding:12, borderRadius:8, boxShadow:"0 6px 18px rgba(0,0,0,0.08)" }}>
      <div style={{ marginBottom:8, fontWeight:700 }}>SHANTI — Mental Health Buddy ({anonId})</div>
      <div ref={scrollRef} style={{ height: 300, overflowY: "auto", padding:8, border: "1px solid #eee", borderRadius:6 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: "8px 0", display:"flex", justifyContent: m.sender==="bot"? "flex-start":"flex-end" }}>
            <div style={{ background: m.sender==="bot" ? "#eef6ff":"#dcf8e8", padding:10, borderRadius:8, maxWidth:"80%" }}>
              <div style={{ fontSize:14 }}>{m.text}</div>
              {m.meta?.tips && m.meta.tips.length>0 && (
                <div style={{ marginTop:6, fontSize:13, color:"#333" }}>
                  <strong>Try:</strong>
                  <ul>
                    {m.meta.tips.map((t,idx)=> <li key={idx}>{t}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:8, marginTop:10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type how you feel (e.g., 'can't sleep', 'exam stress')"
          style={{ flex:1, padding:"8px 10px", borderRadius:6, border:"1px solid #ddd" }}
          onKeyDown={e => e.key === "Enter" && send()}
        />
        <button onClick={send} style={{ padding:"8px 12px", borderRadius:6, background:"#2563eb", color:"#fff", border:"none" }}>Send</button>
      </div>
      <div style={{ marginTop:8, fontSize:12, color:"#666" }}>
        Note: This is first-aid only — not a diagnosis. For emergencies call local services or 9152987821.
      </div>
    </div>
  );
}
