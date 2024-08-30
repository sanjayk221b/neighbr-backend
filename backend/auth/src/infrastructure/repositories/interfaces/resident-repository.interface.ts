import { IResident } from "@/entities";

export interface IResidentRepository {
  addResident(resident: IResident): Promise<IResident>;
  getResidents(): Promise<IResident[]>;
  blockUnblockResident(residentId: string): Promise<IResident | null>;
  getResidentByEmail(email: string): Promise<IResident | null>;
  changeResidentPassword(email: string, newPassword: string): Promise<boolean>;
}
