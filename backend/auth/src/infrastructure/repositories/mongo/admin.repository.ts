import { IAdminRepository } from "../index";
// import { ICaretaker, IResident } from "../../../entities/index";
import Resident from "./models/resident.model";
import Caretaker from "./models/caretaker.model";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class AdminRepository implements IAdminRepository {

}
