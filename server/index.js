import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 5501;
const JWT_SECRET = process.env.JWT_SECRET || "surmai-local-demo-secret";

// Mock user store. It resets whenever the server restarts.
const users = [];

app.use(cors({ origin: ["http://127.0.0.1:5500", "http://localhost:5500"] }));
app.use(express.json());

const publicUser = (user) => ({ id: user.id, fullName: user.fullName, email: user.email });
const signToken = (user, remember) => jwt.sign(publicUser(user), JWT_SECRET, { expiresIn: remember ? "30d" : "2h" });

function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

app.post("/api/auth/register", (req, res) => {
  const { fullName, email, password, remember } = req.body;
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!fullName || !normalizedEmail || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters." });
  }

  if (users.some((user) => user.email === normalizedEmail)) {
    return res.status(409).json({ message: "Email already registered. Please sign in." });
  }

  const user = { id: crypto.randomUUID(), fullName: fullName.trim(), email: normalizedEmail, password };
  users.push(user);

  return res.status(201).json({ user: publicUser(user), token: signToken(user, Boolean(remember)) });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password, remember } = req.body;
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user) {
    return res.status(404).json({ message: "No account found. Please sign up first." });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Incorrect password." });
  }

  return res.json({ user: publicUser(user), token: signToken(user, Boolean(remember)) });
});

app.post("/api/auth/google", (req, res) => {
  const normalizedEmail = String(req.body.email || "").trim().toLowerCase();
  if (!normalizedEmail.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Please enter a valid Gmail address." });
  }

  const derivedName = normalizedEmail
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  let user = users.find((entry) => entry.email === normalizedEmail);
  if (!user) {
    user = { id: crypto.randomUUID(), fullName: derivedName, email: normalizedEmail, password: null, provider: "google" };
    users.push(user);
  }

  return res.json({ user: publicUser(user), token: signToken(user, true) });
});

app.post("/api/auth/forgot-password", (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!password || password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters." });
  }

  if (!user) {
    return res.status(404).json({ message: "No account found. Please sign up first." });
  }

  user.password = password;
  return res.json({ message: "Password reset successfully. Please sign in with your new password." });
});

app.get("/api/auth/me", authenticate, (req, res) => {
  return res.json({ user: req.user });
});

app.listen(PORT, () => {
  console.log(`Surmai auth API running on http://127.0.0.1:${PORT}`);
});

