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
    return await Complaint.find();
  }
}
