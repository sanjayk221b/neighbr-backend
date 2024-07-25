import { IService } from "@/entities";
import { ServicesRepository } from "@/infrastructure/repositories/mongo/services.repository";

export class ServicesUseCase {
  private readonly _servicesRepository: ServicesRepository;

  constructor(servicesRepository: ServicesRepository) {
    this._servicesRepository = servicesRepository;
  }

  async addServiceRequest(serviceData: IService, residentId: string) {
    try {
      const newService = await this._servicesRepository.createService(
        serviceData,
        residentId
      );

      return newService;
    } catch (error: any) {
      throw new Error(`Failed to add service request: ${error.message}`);
    }
  }

  async getAllServiceRequests() {
    return await this._servicesRepository.getRequests();
  }

  async getServiceRequestsByResidentId(residentId: string) {
    return await this._servicesRepository.getRequestsByResidentId(residentId);
  }

  async updateServiceRequests(serviceId: string, updateData: Partial<IService>) {
    try {
      const updatedService = await this._servicesRepository.updateServiceRequests(serviceId, updateData);
      return updatedService;
    } catch (error: any) {
      throw new Error(`Failed to update service request: ${error.message}`);
    }
  }
}
