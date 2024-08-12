import { IAdminRepository } from "../index";
import { IResident, ICaretaker } from "@/entities";
import Resident from "./models/resident.model";
import Caretaker from "./models/caretaker.model";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class AdminRepository implements IAdminRepository {
  async getResidents(): Promise<IResident[]> {
    return Resident.find({
      $or: [{ isAdmin: false }, { isAdmin: { $exists: false } }],
    });
  } 

  async addResident(resident: IResident): Promise<IResident> {
    const hashedPassword = await bcrypt.hash(resident.password, SALT_ROUNDS);
    const newResident = new Resident({ ...resident, password: hashedPassword });
    return await newResident.save();
  }

  async blockUnblockResident(residentId: string): Promise<IResident | null> {
    const resident = await Resident.findById(residentId);
    if (!resident) return null;

    return await Resident.findByIdAndUpdate(
      residentId,
      { isBlocked: !resident.isBlocked },
      { new: true }
    );
  }
  async getCaretakers(): Promise<ICaretaker[]> {
    return Caretaker.find();
  }

  async addCaretaker(caretaker: ICaretaker): Promise<ICaretaker> {
    const hashedPassword = await bcrypt.hash(caretaker.password, SALT_ROUNDS);
    const newCaretaker = new Caretaker({
      ...caretaker,
      password: hashedPassword,
    });
    return await newCaretaker.save();
  }

  async blockUnblockCaretakers(
    caretakerId: string
  ): Promise<ICaretaker | null> {
    const caretaker = await Caretaker.findById(caretakerId);
    if (!caretaker) return null;

    return await Caretaker.findByIdAndUpdate(
      caretakerId,
      { isBlocked: !caretaker.isBlocked },
      { new: true }
    );
  }
}
