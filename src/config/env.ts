import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://user:password@localhost:5432/mydb",
};
