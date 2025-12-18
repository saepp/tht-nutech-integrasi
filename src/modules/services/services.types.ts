export type ServiceView = {
  id: number;
  code: string;
  name: string;
  icon_url: string;
  price: string;
};

export interface GetAllServiceResponse {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tarif: number;
}
