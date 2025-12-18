import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://user:password@localhost:5432/mydb",
  JWT_PRIVATE_KEY:
    process.env.JWT_PRIVATE_KEY || "your-default-jwt-private-key",
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY || "your-default-jwt-public-key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || 12 * 60 * 60,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
};
