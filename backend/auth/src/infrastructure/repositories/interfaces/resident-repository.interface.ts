import { IResident } from "@/entities";

export interface IResidentRepository {
  addResident(resident: IResident): Promise<IResident>;
  getResidents(page: number, limit: number, search: string): Promise<{ data: IResident[]; totalPages: number }>;
  blockUnblockResident(residentId: string): Promise<IResident | null>;
  getResidentByEmail(email: string): Promise<IResident | null>;
  changeResidentPassword(email: string, newPassword: string): Promise<boolean>;
}
