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
    search: string = ""
  ): Promise<{ data: IService[]; totalPages: number }> {
    const query: any = { residentId };

    if (search) {
      query.$or = [
        { description: { $regex: search, $options: "i" } },
        { serviceType: { $regex: search, $options: "i" } },
        { workerName: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Service.find(query).skip(skip).limit(limit).exec(),
      Service.countDocuments(query),
    ]);

    return {
      data,
      totalPages: Math.ceil(total / limit),
    };
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
