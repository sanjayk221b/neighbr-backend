import { IService } from "@/entities";

export interface IServiceRepository {
  createService(service: IService, residentId: string): Promise<IService>;
  getRequests(): Promise<IService[]>;
  getRequestsByResidentId(residentId: string): Promise<IService[]>;
  updateServiceRequests(serviceId: string, updateData: Partial<IService>): Promise<IService>;
}
