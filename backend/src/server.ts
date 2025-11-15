import express, {
  type ErrorRequestHandler,
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import "dotenv/config";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import { ResponseHandler } from "./middleware/responseHandler.js";
import { ErrorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("mongo connected");
  })
  .catch((error) => {
    console.log("mongo connection failed ", error);
  });

app.use(ResponseHandler);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/upload", uploadRouter);
app.use("/users", userRouter);
// app.use(ErrorHandler);

app.post("/api/test", (req: Request, res: Response) => {
  // return res.status(200).json({ success: true, message: "test message" });
  return res.status(200).json({
    success: true,
    message: "failed",
    user: { name: "khalid", age: 30 },
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `serve listening on port=${process.env.PORT} , visit http://localhost:${process.env.PORT}`
  );
});
