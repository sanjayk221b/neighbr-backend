import { IComplaint } from "@/entities";

export interface IComplaintsRepository {
  addComplaint(complaintData: IComplaint): Promise<IComplaint>;
  getComplaintsByResident(residentId: string): Promise<IComplaint[]>;
  getAllComplaints(): Promise<IComplaint[]>;
}
