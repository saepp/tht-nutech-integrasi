import type { AuthPayload } from "@/modules/auth/auth.payload.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}
