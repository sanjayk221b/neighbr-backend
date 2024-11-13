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

  async getVisitors(
    page: number,
    limit: number,
    search: string = ""
  ): Promise<{ data: IVisitor[]; totalPages: number }> {
    const skip = (page - 1) * limit;

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { apartmentNumber: { $regex: search, $options: "i" } },
        { mobileNumber: { $regex: search, $options: "i" } },
        { vehicleNumber: { $regex: search, $options: "i" } },
      ];
    }

    const [data, total] = await Promise.all([
      VisitorModel.find(query).skip(skip).limit(limit).exec(),
      VisitorModel.countDocuments(query),
    ]);

    return {
      data,
      totalPages: Math.ceil(total / limit),
    };
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
    limit: number,
    search: string = ""
  ): Promise<{ data: IVisitor[]; totalPages: number }> {
    const skip = (page - 1) * limit;

    const query: any = { residentId };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const [data, total] = await Promise.all([
      VisitorModel.find(query).skip(skip).limit(limit).exec(),
      VisitorModel.countDocuments(query),
    ]);

    return {
      data,
      totalPages: Math.ceil(total / limit),
    };
  }

  async pendingVisitorRequests(): Promise<number> {
    return Visitor.countDocuments();
  }
}
