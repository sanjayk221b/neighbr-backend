import { IVisitor } from "@/entities";
import { IVisitorRepository } from "../interfaces";
import VisitorModel from "./models/visitor.model";
import Visitor from "./models/visitor.model";

export class VisitorRepository implements IVisitorRepository {
  async addVisitor(visitor: IVisitor): Promise<IVisitor> {
    const newVisitor = new VisitorModel(visitor);
    await newVisitor.save();
    return newVisitor;
  }

  async getVisitors(): Promise<IVisitor[]> {
    return Visitor.find();
  }

  async updateVisitor(id: string, visitor: IVisitor): Promise<IVisitor | null> {
    const updatedVisitor = await VisitorModel.findByIdAndUpdate(id, visitor, {
      new: true,
    });
    return updatedVisitor;
  }

  async getVisitorsByResident(residentId: string): Promise<IVisitor[]> {
    return await Visitor.find({ residentId });
  }
}
