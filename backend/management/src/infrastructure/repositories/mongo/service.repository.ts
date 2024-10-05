import { IService } from "@/entities";
import Service from "./models/service.model";
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
    return await Service.find({});
  }

  async getRequestsByResidentId(
    residentId: string,
    page: number,
    limit: number,
    search: string
  ): Promise<IService[]> {
    const query: any = { residentId };
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    return await Service.find(query).skip(skip).limit(limit);
  }

  async updateServiceRequests(
    serviceId: string,
    updateData: Partial<IService>
  ): Promise<IService> {
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      updateData,
      { new: true }
    );
    if (!updatedService) {
      throw new Error("Service not found");
    }
    return updatedService;
  }

  async pendingServiceRequestsCount(): Promise<number> {
    return await Service.countDocuments({ status: "pending" });
  }
}
