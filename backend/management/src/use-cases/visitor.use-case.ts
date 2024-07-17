import { IVisitor } from "@/entities";
import { VisitorRepository } from "@/infrastructure/repositories/mongo";
import { EncryptPassword } from "@/infrastructure/services/encryptPassword";
import { Cloudinary } from "@/infrastructure/services/cloudinary";

export class VisitorUseCase {
  private readonly _visitorRepository: VisitorRepository;
  private readonly _encryptPassword: EncryptPassword;
  private readonly _cloudinary: Cloudinary;

  constructor(
    visitorRepository: VisitorRepository,
    encryptPassword: EncryptPassword,
    cloudinary: Cloudinary
  ) {
    this._visitorRepository = visitorRepository;
    this._encryptPassword = encryptPassword;
    this._cloudinary = cloudinary;
  }

  async addVisitor(
    data: IVisitor,
    file?: Express.Multer.File
  ): Promise<IVisitor> {
    if (file) {
      try {
        const result = await this._cloudinary.upload(file);
        data.image = result;
      } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
        throw new Error("Image upload failed");
      }
    }

    const newVisitor = await this._visitorRepository.addVisitor(data);
    return newVisitor;
  }

  async getVisitors(): Promise<IVisitor[]> {
    return await this._visitorRepository.getVisitors();
  }

  async updateVisitor(id: string, data: IVisitor): Promise<IVisitor> {
    const updatedVisitor = await this._visitorRepository.updateVisitor(
      id,
      data
    );
    if (!updatedVisitor) {
      throw new Error(`Visitor with id ${id} not found`);
    }
    return updatedVisitor;
  }
}
