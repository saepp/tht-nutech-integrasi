import type { Request, Response } from "express";
import { BannerService } from "./banner.service.js";
import { sendSuccess } from "@/utils/response.js";

export const BannerController = {
  async getAllBanners(_req: Request, res: Response): Promise<void> {
    const banners = await BannerService.getAllBanners();

    sendSuccess(res, "Sukses", banners);
  },
};
