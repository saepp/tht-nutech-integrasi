import { errorHandler } from "@/middleware/error.middleware.js";
import { AuthController } from "@/modules/auth/auth.controller.js";
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(express.json());

app.post("/registration", AuthController.register);
app.post("/login", AuthController.login);

app.use(errorHandler);

export default app;
