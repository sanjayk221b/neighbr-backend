import { IResident, ICaretaker } from "@/entities";


export interface IAdminRepository {
  addResident(resident: IResident): Promise<IResident>;
  getResidents(): Promise<IResident[]>;
  blockUnblockResident(residentId: string): Promise<IResident | null>;
  getCaretakers(): Promise<ICaretaker[]>;
  addCaretaker(caretaker: ICaretaker): Promise<ICaretaker>;
  blockUnblockCaretakers(caretakerId: string): Promise<ICaretaker | null>;
}
