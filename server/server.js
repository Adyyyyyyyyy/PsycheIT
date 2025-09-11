import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import natural from "natural";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Secret key for JWT
const JWT_SECRET = "supersecretkey123";

// In-memory DB (replace with MongoDB/Postgres later if needed)
let users = [];

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

/* ---------------------------
   Train the classifier
   --------------------------- */
const classifier = new natural.BayesClassifier();

// Academic
classifier.addDocument("I am stressed about exams", "academic");
classifier.addDocument("Too much study pressure", "academic");
classifier.addDocument("Worried about my marks", "academic");

// Family
classifier.addDocument("My parents keep fighting", "family");
classifier.addDocument("Home problems", "family");
classifier.addDocument("I miss my family", "family");
classifier.addDocument("I feel like I can't talk to my family", "family");

// Social / Relationships
classifier.addDocument("I broke up with my partner", "social");
classifier.addDocument("My friends ignore me", "social");
classifier.addDocument("Feeling lonely", "social");
classifier.addDocument("I have no friends", "social");
// (… keeping the rest of your training data)
classifier.addDocument("I feel like I'm not trusted", "social");

// Sleep
classifier.addDocument("I can't sleep at night", "sleep");
classifier.addDocument("Insomnia is killing me", "sleep");
classifier.addDocument("I feel tired all day", "sleep");
// (… same as your file)
classifier.addDocument("I feel like I never get enough sleep", "sleep");

// Anxiety
classifier.addDocument("I feel anxious and panic", "anxiety");
classifier.addDocument("Too much overthinking", "anxiety");
classifier.addDocument("I can't calm down", "anxiety");
// (… same as your file)
classifier.addDocument("I feel like I'm going crazy", "anxiety");

// High risk
classifier.addDocument("I want to die", "highrisk");
classifier.addDocument("I feel hopeless", "highrisk");
classifier.addDocument("Nothing matters anymore", "highrisk");
// (… same as your file)
classifier.addDocument("I feel like I'm going to have a heart attack", "highrisk");

// General
classifier.addDocument("I feel okay", "general");
classifier.addDocument("I am fine", "general");
classifier.addDocument("Just a regular day", "general");

// Greeting
classifier.addDocument("hi", "greeting");
classifier.addDocument("hello", "greeting");
classifier.addDocument("hey", "greeting");

// Counselor
classifier.addDocument("yes book counselor", "counselor");
classifier.addDocument("I need a counselor", "counselor");

classifier.train();

/* ---------------------------
   Middleware: Auth check
   --------------------------- */
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid/Expired token" });
    req.user = user;
    next();
  });
}

/* ---------------------------
   Auth Routes
   --------------------------- */

// Signup (collegeCode required)
app.post("/signup", async (req, res) => {
  const { collegeCode } = req.body;
  if (!collegeCode) {
    return res.status(400).json({ error: "College code is required" });
  }

  // Generate unique ID + password
  const uniqueId = `${collegeCode}-${Math.floor(1000 + Math.random() * 9000)}`;
  const plainPassword = Math.random().toString(36).slice(-8); // random 8-char password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Save user
  const user = { id: uniqueId, password: hashedPassword, collegeCode };
  users.push(user);

  res.json({
    message: "User created successfully",
    userId: uniqueId,
    password: plainPassword, // show plain password once (tell user to save it!)
  });
});

// Login
app.post("/login", async (req, res) => {
  const { userId, password } = req.body;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // Generate JWT
  const token = jwt.sign({ userId: user.id, collegeCode: user.collegeCode }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
});

// Logout (frontend just deletes token, but optional route)
app.post("/logout", (req, res) => {
  res.json({ message: "Logout successful (just delete token on frontend)" });
});

/* ---------------------------
   Protected Example Route
   --------------------------- */
app.get("/me", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

/* ---------------------------
   Classifier Route
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
