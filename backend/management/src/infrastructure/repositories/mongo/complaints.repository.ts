import { IComplaint } from "@/entities";
import Complaint from "./models/complaints.model";
import { IComplaintsRepository } from "../interfaces/complaints-repository.interface";

export class ComplaintsRepository implements IComplaintsRepository {
  async addComplaint(complaintData: IComplaint): Promise<IComplaint> {
    const newComplaint = new Complaint(complaintData);
    await newComplaint.save();
    return newComplaint;
  }

  async getComplaintsByResident(residentId: string): Promise<IComplaint[]> {
    return await Complaint.find({ residentId });
  }

  async getAllComplaints(): Promise<IComplaint[]> {
    return await Complaint.find().populate("residentId");
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
}
