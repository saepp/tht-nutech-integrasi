import { query } from "@/database/index.js";
import type { BannerView } from "./banner.types.js";

export const BannerRepository = {
  async getAllBanners(): Promise<BannerView[]> {
    const res = await query<BannerView>(
      `
        SELECT id, name, url, description
        FROM banners;
      `,
      []
    );

    return res;
  },
};
