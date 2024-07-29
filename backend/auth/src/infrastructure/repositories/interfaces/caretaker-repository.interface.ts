import { ICaretaker } from "@/entities";

export interface ICaretakerRepository {
  getCaretakerByEmail(email: string): Promise<ICaretaker | null>;
}
