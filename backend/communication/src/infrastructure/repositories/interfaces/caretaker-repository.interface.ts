import { ICaretaker } from "@/entities";

export interface ICaretakerRepository {
  getCaretakerByEmail(email: string): Promise<ICaretaker | null>;
  updateCaretaker(caretaker: ICaretaker): Promise<ICaretaker>;
}
