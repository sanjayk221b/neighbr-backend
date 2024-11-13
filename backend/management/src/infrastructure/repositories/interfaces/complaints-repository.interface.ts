import { IComplaint } from "@/entities";

export interface IComplaintsRepository {
  addComplaint(complaintData: IComplaint): Promise<IComplaint>;
  getComplaintsByResident(residentId: string, page: number, limit: number): Promise<{ data: IComplaint[]; totalPages: number }>;
  getAllComplaintsByRecipientType(recipientType: string, page: number, limit: number): Promise<IComplaint[]>;
  updateComplaint(complaintId: string, updateData: Partial<IComplaint>): Promise<IComplaint>;
  pendingComplaintsCount(): Promise<number>;
}
