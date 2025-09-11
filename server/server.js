// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import natural from "natural";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* ---------------------------
   File Storage for Users
   --------------------------- */
const usersFile = path.resolve("./users.json");

function loadUsers() {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

/* ---------------------------
   Classifier Training
   --------------------------- */
const classifier = new natural.BayesClassifier();

// ==================== GREETING ====================
classifier.addDocument("hi", "greeting");
classifier.addDocument("hello", "greeting");
classifier.addDocument("hey", "greeting");
classifier.addDocument("good morning", "greeting");
classifier.addDocument("good afternoon", "greeting");
classifier.addDocument("good evening", "greeting");
classifier.addDocument("how are you", "greeting");
classifier.addDocument("what’s up", "greeting");
classifier.addDocument("yo", "greeting");
classifier.addDocument("sup", "greeting");
classifier.addDocument("greetings", "greeting");
classifier.addDocument("hello there", "greeting");
classifier.addDocument("hey buddy", "greeting");
classifier.addDocument("hi friend", "greeting");
classifier.addDocument("good to see you", "greeting");
classifier.addDocument("howdy", "greeting");
classifier.addDocument("hi chatbot", "greeting");
classifier.addDocument("nice to meet you", "greeting");
classifier.addDocument("hey there", "greeting");
classifier.addDocument("yo bro", "greeting");
classifier.addDocument("long time no see", "greeting");

// ==================== ACADEMIC ====================
classifier.addDocument("I am stressed about exams", "academic");
classifier.addDocument("Too much study pressure", "academic");
classifier.addDocument("Worried about my marks", "academic");
classifier.addDocument("I can’t focus on studying", "academic");
classifier.addDocument("I failed my test", "academic");
classifier.addDocument("My grades are going down", "academic");
classifier.addDocument("I’m afraid of failing", "academic");
classifier.addDocument("Too many assignments", "academic");
classifier.addDocument("I can’t finish my homework", "academic");
classifier.addDocument("The syllabus is too big", "academic");
classifier.addDocument("My teachers put too much pressure", "academic");
classifier.addDocument("I get nervous before exams", "academic");
classifier.addDocument("I don’t understand math", "academic");
classifier.addDocument("I’m weak in science", "academic");
classifier.addDocument("Everyone is smarter than me", "academic");
classifier.addDocument("I can’t keep up in class", "academic");
classifier.addDocument("I study but forget everything", "academic");
classifier.addDocument("My brain freezes in exams", "academic");
classifier.addDocument("I’m behind in my lessons", "academic");
classifier.addDocument("School is overwhelming", "academic");
classifier.addDocument("I have too many projects due", "academic");
classifier.addDocument("My exam fear is uncontrollable", "academic");
classifier.addDocument("I feel burnt out from studying", "academic");

// ==================== FAMILY ====================
classifier.addDocument("My parents keep fighting", "family");
classifier.addDocument("Home problems", "family");
classifier.addDocument("I miss my family", "family");
classifier.addDocument("My parents don’t understand me", "family");
classifier.addDocument("I feel unwanted at home", "family");
classifier.addDocument("Too many expectations from my family", "family");
classifier.addDocument("My parents compare me with others", "family");
classifier.addDocument("I get scolded a lot", "family");
classifier.addDocument("My parents don’t listen to me", "family");
classifier.addDocument("I feel trapped at home", "family");
classifier.addDocument("My siblings bully me", "family");
classifier.addDocument("There’s no peace at home", "family");
classifier.addDocument("I feel like a burden to my parents", "family");
classifier.addDocument("My family doesn’t support me", "family");
classifier.addDocument("I can’t talk to my parents about my problems", "family");
classifier.addDocument("My family pressures me to study", "family");
classifier.addDocument("My home environment is toxic", "family");
classifier.addDocument("I want to run away from home", "family");
classifier.addDocument("I feel neglected by my family", "family");
classifier.addDocument("My parents don’t care about my feelings", "family");

// ==================== SOCIAL ====================
classifier.addDocument("I broke up with my partner", "social");
classifier.addDocument("My friends ignore me", "social");
classifier.addDocument("Feeling lonely", "social");
classifier.addDocument("Nobody understands me", "social");
classifier.addDocument("I feel left out", "social");
classifier.addDocument("I don’t have close friends", "social");
classifier.addDocument("My best friend betrayed me", "social");
classifier.addDocument("I can’t trust anyone", "social");
classifier.addDocument("My friends don’t invite me anywhere", "social");
classifier.addDocument("I feel socially awkward", "social");
classifier.addDocument("People make fun of me", "social");
classifier.addDocument("I feel unloved", "social");
classifier.addDocument("My crush rejected me", "social");
classifier.addDocument("I can’t make new friends", "social");
classifier.addDocument("I feel invisible", "social");
classifier.addDocument("Everyone is busy with their own life", "social");
classifier.addDocument("I don’t fit in anywhere", "social");
classifier.addDocument("My relationship is toxic", "social");
classifier.addDocument("People don’t like me", "social");
classifier.addDocument("I feel abandoned", "social");

// ==================== SLEEP ====================
classifier.addDocument("I can’t sleep at night", "sleep");
classifier.addDocument("Insomnia is killing me", "sleep");
classifier.addDocument("I feel tired all day", "sleep");
classifier.addDocument("My sleep schedule is ruined", "sleep");
classifier.addDocument("I wake up at 3 AM every day", "sleep");
classifier.addDocument("I overthink at night", "sleep");
classifier.addDocument("I keep having nightmares", "sleep");
classifier.addDocument("I stay up scrolling on my phone", "sleep");
classifier.addDocument("I get less than 4 hours of sleep", "sleep");
classifier.addDocument("My eyes hurt from no sleep", "sleep");
classifier.addDocument("I can’t wake up in the morning", "sleep");
classifier.addDocument("My mind is restless at night", "sleep");
classifier.addDocument("I’m addicted to late nights", "sleep");
classifier.addDocument("I feel drained even after sleeping", "sleep");
classifier.addDocument("I have trouble falling asleep", "sleep");
classifier.addDocument("I wake up multiple times at night", "sleep");
classifier.addDocument("I rely on coffee to stay awake", "sleep");
classifier.addDocument("I binge Netflix till morning", "sleep");
classifier.addDocument("I’m always sleep deprived", "sleep");
classifier.addDocument("I can’t concentrate due to lack of sleep", "sleep");

// ==================== ANXIETY ====================
classifier.addDocument("I feel anxious and panic", "anxiety");
classifier.addDocument("Too much overthinking", "anxiety");
classifier.addDocument("I can’t calm down", "anxiety");
classifier.addDocument("My heart races all the time", "anxiety");
classifier.addDocument("I get panic attacks", "anxiety");
classifier.addDocument("I worry about everything", "anxiety");
classifier.addDocument("I feel restless", "anxiety");
classifier.addDocument("I’m afraid of the future", "anxiety");
classifier.addDocument("My chest feels heavy", "anxiety");
classifier.addDocument("I can’t control my thoughts", "anxiety");
classifier.addDocument("I get nervous for no reason", "anxiety");
classifier.addDocument("I can’t breathe properly when anxious", "anxiety");
classifier.addDocument("I sweat when I’m stressed", "anxiety");
classifier.addDocument("I feel pressure in my head", "anxiety");
classifier.addDocument("I’m scared of making mistakes", "anxiety");
classifier.addDocument("I get anxious before talking to people", "anxiety");
classifier.addDocument("I can’t stop shaking sometimes", "anxiety");
classifier.addDocument("My anxiety makes me sick", "anxiety");
classifier.addDocument("I avoid situations that stress me", "anxiety");
classifier.addDocument("I overthink small problems", "anxiety");

// ==================== HIGH RISK ====================
classifier.addDocument("I want to die", "highrisk");
classifier.addDocument("I feel hopeless", "highrisk");
classifier.addDocument("Nothing matters anymore", "highrisk");
classifier.addDocument("I don’t want to live", "highrisk");
classifier.addDocument("I feel like ending my life", "highrisk");
classifier.addDocument("I can’t go on anymore", "highrisk");
classifier.addDocument("I’m done with everything", "highrisk");
classifier.addDocument("I feel empty inside", "highrisk");
classifier.addDocument("Life is meaningless", "highrisk");
classifier.addDocument("I want to disappear", "highrisk");
classifier.addDocument("I hate my life", "highrisk");
classifier.addDocument("I feel like giving up", "highrisk");
classifier.addDocument("I’m tired of living", "highrisk");
classifier.addDocument("I don’t care if I die", "highrisk");
classifier.addDocument("Everything is pointless", "highrisk");
classifier.addDocument("I wish I wasn’t born", "highrisk");
classifier.addDocument("Nobody would miss me", "highrisk");
classifier.addDocument("I can’t take this pain", "highrisk");
classifier.addDocument("I feel broken", "highrisk");
classifier.addDocument("I want it all to stop", "highrisk");

// ==================== DEPRESSION ====================
classifier.addDocument("I feel sad all the time", "depression");
classifier.addDocument("I don’t enjoy anything anymore", "depression");
classifier.addDocument("I feel empty", "depression");
classifier.addDocument("I lost interest in my hobbies", "depression");
classifier.addDocument("I don’t feel like getting out of bed", "depression");
classifier.addDocument("I’m always tired", "depression");
classifier.addDocument("I have no motivation", "depression");
classifier.addDocument("I feel worthless", "depression");
classifier.addDocument("I feel guilty for no reason", "depression");
classifier.addDocument("I don’t care about life", "depression");
classifier.addDocument("I cry for no reason", "depression");
classifier.addDocument("I feel stuck", "depression");
classifier.addDocument("I can’t feel happiness", "depression");
classifier.addDocument("My energy is gone", "depression");
classifier.addDocument("I feel like a failure", "depression");
classifier.addDocument("Nothing excites me anymore", "depression");
classifier.addDocument("I feel disconnected from people", "depression");
classifier.addDocument("My life feels dark", "depression");
classifier.addDocument("I don’t feel good enough", "depression");
classifier.addDocument("I feel down most days", "depression");

// ==================== GENERAL ====================
classifier.addDocument("I feel okay", "general");
classifier.addDocument("I am fine", "general");
classifier.addDocument("Just a regular day", "general");
classifier.addDocument("I’m doing good", "general");
classifier.addDocument("Nothing much happening", "general");
classifier.addDocument("Everything is normal", "general");
classifier.addDocument("I’m alright", "general");
classifier.addDocument("Today was okay", "general");
classifier.addDocument("I don’t feel much", "general");
classifier.addDocument("I feel average", "general");
classifier.addDocument("I’m doing better", "general");
classifier.addDocument("Nothing new", "general");
classifier.addDocument("I’m neutral", "general");
classifier.addDocument("I feel balanced", "general");
classifier.addDocument("I’m calm", "general");
classifier.addDocument("Today was decent", "general");
classifier.addDocument("I feel steady", "general");
classifier.addDocument("Not too bad", "general");
classifier.addDocument("I feel relaxed", "general");
classifier.addDocument("Things are fine", "general");

// ==================== COUNSELOR ====================
classifier.addDocument("yes book counselor", "counselor");
classifier.addDocument("I need a counselor", "counselor");
classifier.addDocument("can you help me find a counselor", "counselor");
classifier.addDocument("I want to talk to a professional", "counselor");
classifier.addDocument("I want therapy", "counselor");
classifier.addDocument("I need someone to guide me", "counselor");
classifier.addDocument("Can I book an appointment", "counselor");
classifier.addDocument("I need mental health support", "counselor");
classifier.addDocument("I want to speak to a therapist", "counselor");
classifier.addDocument("Please connect me to a counselor", "counselor");
classifier.addDocument("I need counseling", "counselor");
classifier.addDocument("I want to meet a psychologist", "counselor");
classifier.addDocument("I need expert advice", "counselor");
classifier.addDocument("Can I get therapy sessions", "counselor");
classifier.addDocument("I want to book therapy", "counselor");
classifier.addDocument("I need emotional support", "counselor");
classifier.addDocument("Please help me talk to a professional", "counselor");
classifier.addDocument("I want regular counseling", "counselor");
classifier.addDocument("Can you schedule therapy for me", "counselor");
classifier.addDocument("I need help from a counselor", "counselor");


classifier.train();

/* ---------------------------
   Chatbot Route
   --------------------------- */
app.post("/classify", (req, res) => {
  const { message } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "missing message" });
  }

  const intent = classifier.classify(message);
  const classifications = classifier.getClassifications(message).slice(0, 3);
  res.json({ intent, classifications });
});

/* ---------------------------
   Auth Routes
   --------------------------- */

// Signup → just generate creds, don’t save
app.post("/signup", (req, res) => {
  const { collegeCode } = req.body;
  if (!collegeCode) {
    return res.status(400).json({ error: "College code required" });
  }

  const userId = `${collegeCode}_${Date.now()}`;
  const password = Math.random().toString(36).slice(-8);

  res.json({ userId, password });
});

// Login → save user if first time
app.post("/login", (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ error: "User ID and Password required" });
  }

  let users = loadUsers();
  const existing = users.find((u) => u.userId === userId);

  if (existing) {
    const valid = bcrypt.compareSync(password, existing.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { userId, password: hashedPassword };
    users.push(newUser);
    saveUsers(users);
  }

  const token = jwt.sign({ userId }, "secretKey", { expiresIn: "1h" });
  res.json({ token });
});

/* ---------------------------
   Start Server
   --------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
