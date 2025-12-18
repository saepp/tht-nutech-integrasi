import { BannerRepository } from "./banner.repository.js";
import type { BannerView, GetAllBannerResponse } from "./banner.types.js";

export const BannerService = {
  async getAllBanners(): Promise<GetAllBannerResponse[]> {
    const banners = await BannerRepository.getAllBanners();

    const response: GetAllBannerResponse[] = banners.map(
      (banner: BannerView) => ({
        banner_name: banner.name,
        banner_image: banner.url,
        description: banner.description,
      })
    );

    return response;
  },
};
