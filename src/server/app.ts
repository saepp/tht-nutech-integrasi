import { authMiddleware } from "@/middleware/auth.middleware.js";
import { errorHandler } from "@/middleware/error.middleware.js";
import { AuthController } from "@/modules/auth/auth.controller.js";
import { ProfileController } from "@/modules/profile/profile.controller.js";
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(express.json());

// AUTH ROUTES
app.post("/registration", AuthController.register);
app.post("/login", AuthController.login);

// PROFILE ROUTES
app.get("/profile", authMiddleware, ProfileController.getProfile);
app.put("/profile/update", authMiddleware, ProfileController.updateProfile);

app.use(errorHandler);

export default app;
