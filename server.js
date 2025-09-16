const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
const allowedOrigins = process.env.CORS_ORIGINS.split(",");
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
app.use("/api/v1/auth", authRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
