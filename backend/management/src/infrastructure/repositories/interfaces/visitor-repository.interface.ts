import { IVisitor } from "@/entities";

export interface IVisitorRepository {
  getVisitors(): Promise<IVisitor[]>;
  addVisitor(visitor: IVisitor): Promise<IVisitor>;
  updateVisitor(id: string, updatedVisitor: IVisitor): Promise<IVisitor | null>;
}
