import { IResident } from "@/entities";

export interface IResidentRepository {
  getResidentByEmail(email: string): Promise<IResident | null>;
  updateResident(resident: IResident): Promise<IResident>;
  count(): Promise<number>;
}
