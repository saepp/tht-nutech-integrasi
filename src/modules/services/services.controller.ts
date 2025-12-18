import type { Request, Response } from "express";
import { ServicesService } from "./services.service.js";
import { sendSuccess } from "@/utils/response.js";

export const ServiceController = {
  async getAllServices(_req: Request, res: Response) {
    const services = await ServicesService.getAllServices();

    sendSuccess(res, "Sukses", services);
  },
};
