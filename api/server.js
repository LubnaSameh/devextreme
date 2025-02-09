const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// تحميل البيانات من db.json
const db = JSON.parse(fs.readFileSync("api/db.json", "utf-8"));

// API Endpoints
app.get("/api/employees", (req, res) => {
  res.json(db.employees);
});

app.get("/api/orders", (req, res) => {
  res.json(db.orders);
});

app.get("/api/appointments", (req, res) => {
  res.json(db.appointments);
});

app.get("/api/stock_prices", (req, res) => {
  res.json(db.stock_prices);
});

app.get("/api/sales", (req, res) => {
  res.json(db.sales);
});

app.get("/api/products", (req, res) => {
  res.json(db.products);
});

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
