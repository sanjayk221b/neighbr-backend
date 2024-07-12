import IResident from "../../../entities/resident.entity";

export interface IResidentRepository {
  getResidentByEmail(email: string): Promise<IResident | null>;
}
