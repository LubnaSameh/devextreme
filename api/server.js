const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Get the absolute path to db.json (Fix path issues)
const dbPath = path.join(__dirname, "db.json");

// Check if db.json exists
if (!fs.existsSync(dbPath)) {
  console.error("❌ ERROR: db.json file not found!");
  process.exit(1);
}

// Load data from db.json
const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

// API Endpoints
app.get("/api/employees", (req, res) => res.json(db.employees || []));
app.get("/api/orders", (req, res) => res.json(db.orders || []));
app.get("/api/appointments", (req, res) => res.json(db.appointments || []));
app.get("/api/stock_prices", (req, res) => res.json(db.stock_prices || []));
app.get("/api/sales", (req, res) => res.json(db.sales || []));
app.get("/api/products", (req, res) => res.json(db.products || []));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
