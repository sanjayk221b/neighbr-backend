import ICaretaker from "../../../entities/caretaker.entity";

export interface ICaretakerRepository {
  getCaretakerByEmail(email: string): Promise<ICaretaker | null>;
}
