import dotenv from "dotenv";
import dbConnect from "./config/db.config.js";
import userRouter from "./routes/user.route.js";
import scoreRouter from "./routes/score.route.js";
import cors from "cors";

import express from "express";
import { authMiddleware } from "./middleware/authorization.js";

dbConnect();
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user/", userRouter);
app.use("/score/", authMiddleware, scoreRouter);

app.listen(process.env.PORT ?? 30000, () => {
  console.log(`Server runing on PORT: ${process.env.PORT ?? 3000}`);
});
