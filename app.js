import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://munchify-frontend.vercel.app/"
    : "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL, // Fallback to allow all origins if FRONTEND_URL is not defined
    methods: ["POST", "GET", "PUT", "DELETE"], // Allow necessary methods
    // credentials: true, // Ensure frontend requests send cookies if needed
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/reservation", reservationRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
