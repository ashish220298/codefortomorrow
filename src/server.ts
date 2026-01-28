
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./utils/db";
import chatRoutes from "./routes/chat.routes";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/user", userRoutes);

AppDataSource.initialize().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
