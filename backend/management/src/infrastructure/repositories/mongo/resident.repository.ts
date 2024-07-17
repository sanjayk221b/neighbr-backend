import { IResident } from "@/entities";
import { IResidentRepository } from "../interfaces/resident-repository.interface";
import Resident from "./models/resident.model";

export class ResidentRepository implements IResidentRepository {
  async getResidentByEmail(email: string): Promise<IResident | null> {
    return Resident.findOne({ email });
  }
}
