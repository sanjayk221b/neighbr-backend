import { IVisitor } from "@/entities";

export interface IVisitorRepository {
  getVisitors(page: number, limit: number): Promise<IVisitor[]>;
  addVisitor(visitor: IVisitor): Promise<IVisitor>;
  updateVisitor(id: string, updatedVisitor: IVisitor): Promise<IVisitor | null>;
  getVisitorsByResident(residentId: string, page: number, limit: number):   Promise<{ data: IVisitor[]; totalPages: number }>
  ;
}
