import { IVisitor } from "@/entities";

export interface IVisitorRepository {
  addVisitor(visitor: IVisitor): Promise<IVisitor>;
  updateVisitor(id: string, updatedVisitor: IVisitor): Promise<IVisitor | null>;
  getVisitors(page: number, limit: number, search: string): Promise<{ data: IVisitor[]; totalPages: number }>;
  getVisitorsByResident(residentId: string, page: number, limit: number): Promise<{ data: IVisitor[]; totalPages: number }>;
  pendingVisitorRequests(): Promise<number>;
}
