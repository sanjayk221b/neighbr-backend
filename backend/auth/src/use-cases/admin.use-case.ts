import { IResident, ICaretaker } from "@/entities";
import {
  CaretakerRepository,
  ResidentRepository,
} from "../infrastructure/repositories/mongo";
import { JWT } from "../infrastructure/services/jwt";
import { cloudinary } from "../infrastructure/services/cloudinary";
import bcrypt from "bcrypt";
import {
  sendResidentCreatedEvent,
  sendResidentUpdatedEvent,
  sendCaretakerCreatedEvent,
  sendCaretakerUpdatedEvent,
} from "@/events/kafka/producers";
export class AdminUseCase {
  private readonly _residentRepository: ResidentRepository;
  private readonly _caretakerRepository: CaretakerRepository;
  private readonly _jwt: JWT;

  constructor(
    residentRepository: ResidentRepository,
    caretakerRepository: CaretakerRepository,
    jwt: JWT
  ) {
    this._residentRepository = residentRepository;
    this._caretakerRepository = caretakerRepository;
    this._jwt = jwt;
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    message: string;
    token?: string;
    admin?: Partial<IResident>;
  }> {
    const admin = await this._residentRepository.findAdminByEmail(email);

    if (!admin) {
      return { message: "Admin not found" };
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return { message: "Invalid password" };
    }

    const token = this._jwt.generateToken({
      id: admin._id,
      role: "admin",
    });

    const adminDetails: Partial<IResident> = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      mobileNumber: admin.mobileNumber,
      apartmentNumber: admin.apartmentNumber,
      isBlocked: admin.isBlocked,
      isAdmin: admin.isAdmin,
      hasVehicle: admin.hasVehicle,
      vehicles: admin.vehicles,
      image: admin.image,
    };

    return {
      message: "Login successful",
      token: token,
      admin: adminDetails,
    };
  }

  async getResidents(): Promise<IResident[]> {
    return await this._residentRepository.getResidents();
  }

  async addResident(
    data: IResident,
    file?: Express.Multer.File
  ): Promise<IResident> {
    if (file) {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        data.image = result.secure_url; 
      } catch (err) {
        throw new Error("Image upload failed");
      }
    }
    const newResident = await this._residentRepository.addResident(data);
    if (newResident) {
      await sendResidentCreatedEvent(data);
      await sendResidentUpdatedEvent(newResident);
    }
    return newResident;
  }

  async blockUnblockResident(residentId: string) {
    return await this._residentRepository.blockUnblockResident(residentId);
  }

  async getCaretakers(): Promise<ICaretaker[]> {
    return await this._caretakerRepository.getCaretakers();
  }

  async addCaretaker(
    data: ICaretaker,
    file?: Express.Multer.File
  ): Promise<ICaretaker> {
    if (file) {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        data.image = result.secure_url;
      } catch (err) {
        throw new Error("Image upload failed");
      }
    }
    const newCaretaker = await this._caretakerRepository.addCaretaker(data);
    if (newCaretaker) {
      await sendCaretakerCreatedEvent(data);
      await sendCaretakerUpdatedEvent(newCaretaker);
    }

    return newCaretaker;
  }

  async blockUnblockCaretaker(caretakerId: string) {
    return await this._caretakerRepository.blockUnblockCaretakers(caretakerId);
  }
}
