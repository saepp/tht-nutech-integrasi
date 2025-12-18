import { ServiceRepository } from "./services.repository.js";
import type { GetAllServiceResponse, ServiceView } from "./services.types.js";

export const ServicesService = {
  async getAllServices(): Promise<GetAllServiceResponse[]> {
    const services = await ServiceRepository.getAllServices();

    const response: GetAllServiceResponse[] = services.map(
      (service: ServiceView) => ({
        service_code: service.code,
        service_name: service.name,
        service_icon: service.icon_url,
        service_tarif: parseFloat(service.price),
      })
    );

    return response;
  },
};
