import { IComplaint } from "@/entities";

export interface IComplaintsRepository {
  addComplaint(complaintData: IComplaint): Promise<IComplaint>;
  getComplaintsByResident(residentId: string): Promise<IComplaint[]>;
  getAllComplaintsByRecipientType(recipientType: string): Promise<IComplaint[]>;
  updateComplaint(complaintId: string, updateData: Partial<IComplaint>): Promise<IComplaint>;
}
