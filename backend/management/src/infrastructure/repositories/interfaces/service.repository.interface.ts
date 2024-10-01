import { IService } from "@/entities";

export interface IServiceRepository {
  createService(service: IService, residentId: string): Promise<IService>;
  getRequests(): Promise<IService[]>;
  getRequestsByResidentId(residentId: string, page: number, limit: number, search: string): Promise<IService[]>;
  updateServiceRequests(serviceId: string, updateData: Partial<IService>): Promise<IService>;
  pendingServiceRequestsCount(): Promise<number>;
}
