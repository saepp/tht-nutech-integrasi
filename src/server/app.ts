import { authMiddleware } from "@/middleware/auth.middleware.js";
import { errorHandler } from "@/middleware/error.middleware.js";
import { AccountController } from "@/modules/account/account.controller.js";
import { AuthController } from "@/modules/auth/auth.controller.js";
import { BannerController } from "@/modules/banner/banner.controller.js";
import { ProfileController } from "@/modules/profile/profile.controller.js";
import { ServiceController } from "@/modules/services/services.controller.js";
import { TransactionController } from "@/modules/transaction/transaction.controller.js";
import { UploadController } from "@/modules/upload/upload.controller.js";
import express from "express";
import helmet from "helmet";
import multer from "multer";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// AUTH ROUTES
app.post("/registration", AuthController.register);
app.post("/login", AuthController.login);

// PROFILE ROUTES
app.get("/profile", authMiddleware, ProfileController.getProfile);
app.put("/profile/update", authMiddleware, ProfileController.updateProfile);
app.put(
  "/profile/image",
  authMiddleware,
  upload.single("file"),
  UploadController.uploadProfileImage
);

// BANNER ROUTES
app.get("/banner", BannerController.getAllBanners);

// SERVICES ROUTES
app.get("/services", ServiceController.getAllServices);

// ACCOUNT ROUTES
app.get("/balance", authMiddleware, AccountController.getAccountBalance);
app.post("/topup", authMiddleware, AccountController.topup);

// TRANSACTION ROUTES
app.post(
  "/transaction",
  authMiddleware,
  TransactionController.createPaymentTransaction
);
app.get(
  "/transaction/history",
  authMiddleware,
  TransactionController.getTransactionHistory
);

// ERROR HANDLER
app.use(errorHandler);

export default app;
