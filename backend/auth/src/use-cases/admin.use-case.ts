import { Express } from "express";
import IResident from "../entities/resident.entity";
import { AdminRepository } from "../infrastructure/repositories/mongo";
import { JWT } from "../infrastructure/services/jwt";
import { cloudinary } from "../infrastructure/services/cloudinary";
import { Multer } from "multer";
import ICaretaker from "../entities/caretaker.entity";

export class AdminUseCase {
  private readonly _adminRepository: AdminRepository;
  private readonly _jwt: JWT;

  constructor(AdminRepository: AdminRepository, JWT: JWT) {
    this._adminRepository = AdminRepository;
    this._jwt = JWT;
  }

  async login(email: string, password: string): Promise<string | null> {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      const token = this._jwt.generateToken({ email, role: "admin" });
      return token;
    }
    return null;
  }

  async getResidents(): Promise<IResident[]> {
    return await this._adminRepository.getResidents();
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
        console.error("Error uploading image to Cloudinary:", err);
        throw new Error("Image upload failed");
      }
    }
    const newResident = await this._adminRepository.addResident(data);
    // if (newResident) await sendUserCreatedEvent(data);
    return newResident;
  }

  async blockUnblockResident(residentId: string) {
    return await this._adminRepository.blockUnblockResident(residentId);
  }

  async getCaretakers(): Promise<ICaretaker[]> {
    return await this._adminRepository.getCaretakers();
  }

  async addCaretaker(
    data: ICaretaker,
    file?: Express.Multer.File
  ): Promise<ICaretaker> {
    if (file) {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        data.imageUrl = result.secure_url;
      } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
        throw new Error("Image upload failed");
      }
    }
    const newCaretaker = await this._adminRepository.addCaretaker(data);
    // await sendUserCreatedEvent(data);
    return newCaretaker;
  }

  async blockUnblockCaretaker(caretakerId: string) {
    return await this._adminRepository.blockUnblockCaretakers(caretakerId);
  }
}
