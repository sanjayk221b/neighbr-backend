import {IResident} from "@/entities";

export interface IResidentRepository {
  getResidentByEmail(email: string): Promise<IResident | null>;
}
