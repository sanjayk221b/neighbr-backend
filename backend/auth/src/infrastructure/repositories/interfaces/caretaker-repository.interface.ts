import { ICaretaker } from "@/entities";

export interface ICaretakerRepository {
  getCaretakers(): Promise<ICaretaker[]>;
  addCaretaker(caretaker: ICaretaker): Promise<ICaretaker>;
  blockUnblockCaretakers(caretakerId: string): Promise<ICaretaker | null>;
  getCaretakerByEmail(email: string): Promise<ICaretaker | null>;
  changeCaretakerPassword(email: string, newPassword: string): Promise<void>;
}
