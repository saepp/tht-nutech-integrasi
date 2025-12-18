export interface BannerView {
  id: number;
  name: string;
  url: string;
  description: string;
}

export interface GetAllBannerResponse {
  banner_name: string;
  banner_image: string;
  description: string;
}
