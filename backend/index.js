const express = require("express");
const app = express();
const port = 4000;
const mongoDB = require("./db");
const createUserRoute = require("./Routes/CreateUser");
const DisplayRoute = require("./Routes/DisplayData");
const OrderRoute = require("./Routes/OrderData")
// Middleware to parse JSON bodies
app.use(express.json());
const cors = require("cors");

// Middleware for CORS
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your React frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true // Allow cookies if needed
}));
app.options("*", cors());
// Connect to MongoDB
mongoDB();

// Simple route to check if the server is up
app.get("/", (req, res) => {
  res.send("Hello World");
});

// User routes
app.use("/api", createUserRoute);
app.use("/api", DisplayRoute);
app.use("/api", OrderRoute);

// Start the server
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
