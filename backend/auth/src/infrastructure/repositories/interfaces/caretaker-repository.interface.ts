import { ICaretaker } from "@/entities";

export interface ICaretakerRepository {
  getCaretakerByEmail(email: string): Promise<ICaretaker | null>;
  changeCaretakerPassword(email: string, newPassword: string): Promise<void>;
}
