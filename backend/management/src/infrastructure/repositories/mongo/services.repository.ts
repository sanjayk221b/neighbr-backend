import { IService } from "@/entities";
import Service from "./models/services.model";
import { IServiceRepository } from "../interfaces";

export class ServicesRepository implements IServiceRepository {
  async createService(
    service: IService,
    residentId: string
  ): Promise<IService> {
    const newService = new Service({
      ...service,
      residentId: residentId,
    });
    return await newService.save();
  }

  async getRequests(): Promise<IService[]> {
    try {
      return await Service.find({});
    } catch (error: any) {
      throw new Error(`Failed to get requests: ${error.message}`);
    }
  }

  async getRequestsByResidentId(residentId: string): Promise<IService[]> {
    try {
      return await Service.find({ residentId });
    } catch (error: any) {
      throw new Error(
        `Failed to get requests by resident ID: ${error.message}`
      );
    }
  }

  async updateServiceRequests(
    serviceId: string,
    updateData: Partial<IService>
  ): Promise<IService> {
    try {
      const updatedService = await Service.findByIdAndUpdate(
        serviceId,
        updateData,
        { new: true }
      );
      if (!updatedService) {
        throw new Error("Service not found");
      }
      return updatedService;
    } catch (error: any) {
      throw new Error(`Failed to update service: ${error.message}`);
    }
  }
}
