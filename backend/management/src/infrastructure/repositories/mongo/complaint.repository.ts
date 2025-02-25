import { IComplaint } from "@/entities";
import Complaint from "./models/complaint.model";
import { IComplaintsRepository } from "../interfaces/complaints-repository.interface";

export class ComplaintsRepository implements IComplaintsRepository {
  async addComplaint(complaintData: IComplaint): Promise<IComplaint> {
    const newComplaint = new Complaint(complaintData);
    await newComplaint.save();
    return newComplaint;
  }

  async getComplaintsByResident(
    residentId: string,
    page: number,
    limit: number,
    search: string = ""
  ): Promise<{ data: IComplaint[]; totalPages: number }> {
    const skip = (page - 1) * limit;

    const query: any = { residentId };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [complaints, total] = await Promise.all([
      Complaint.find(query).skip(skip).limit(limit).exec(),
      Complaint.countDocuments(query),
    ]);

    return { data: complaints, totalPages: Math.ceil(total / limit) };
  }

  async getAllComplaintsByRecipientType(
    recipientType: string,
    page: number,
    limit: number
  ): Promise<IComplaint[]> {
    const skip = (page - 1) * limit;
    return Complaint.find({ recipientType })
      .populate("residentId")
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async updateComplaint(
    complaintId: string,
    updateData: Partial<IComplaint>
  ): Promise<IComplaint> {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      updateData,
      { new: true }
    );
    if (!updatedComplaint) {
      throw new Error("Complaint not found");
    }
    return updatedComplaint;
  }

  async pendingComplaintsCount(): Promise<number> {
    return Complaint.countDocuments();
  }
}
