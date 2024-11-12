import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import("./src/config/db.config.js");
// import adminRoutes from "./src/routes/AdminRoute.js";
import userRoutes from "./src/routes/UserRoutes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "application/form-data",
    "multipart/form-data"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/api/file", express.static("./public/uploads"));
// app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
