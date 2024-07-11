import IResident from "../../../entities/resident.entity";
import ICaretaker from "../../../entities/caretaker.entity";

export interface IAdminRepository {
  addResident(resident: IResident): Promise<IResident>;
  getResidents(): Promise<IResident[]>;
//   blockResident(residentId: string): Promise<IResident | null>;
//   addCaretaker(caretaker: ICaretaker): Promise<ICaretaker>;
//   getCaretakers(): Promise<ICaretaker[]>;
}
