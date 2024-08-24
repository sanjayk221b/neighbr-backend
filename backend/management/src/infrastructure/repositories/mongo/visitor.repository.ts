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

  async getVisitors(page: number, limit: number): Promise<IVisitor[]> {
    const skip = (page - 1) * limit;
    return VisitorModel.find().skip(skip).limit(limit).exec();
  }

  async updateVisitor(id: string, visitor: IVisitor): Promise<IVisitor | null> {
    const updatedVisitor = await VisitorModel.findByIdAndUpdate(id, visitor, {
      new: true,
    });
    return updatedVisitor;
  }

  async getVisitorsByResident(
    residentId: string,
    page: number,
    limit: number
  ): Promise<{ data: IVisitor[]; totalPages: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      VisitorModel.find({ residentId }).skip(skip).limit(limit).exec(),
      VisitorModel.countDocuments({ residentId }),
    ]);

    return {
      data,
      totalPages: Math.ceil(total / limit),
    };
  }
}
