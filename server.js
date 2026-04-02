import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import recordRoutes from "./src/routes/record.routes.js";
import dashboardRoutes from "./src/routes/dashboard.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});