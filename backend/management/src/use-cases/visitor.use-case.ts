import { IVisitor } from "@/entities";
import { VisitorRepository } from "@/infrastructure/repositories/mongo";
import { Cloudinary } from "@/infrastructure/services/cloudinary";

export class VisitorUseCase {
  private readonly _visitorRepository: VisitorRepository;
  private readonly _cloudinary: Cloudinary;

  constructor(visitorRepository: VisitorRepository, cloudinary: Cloudinary) {
    this._visitorRepository = visitorRepository;
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

  async getVisitors(page: number, limit: number): Promise<IVisitor[]> {
    return await this._visitorRepository.getVisitors(page, limit);
  }

  async getVisitorsByResidentId(
    residentId: string,
    page: number,
    limit: number
  ): Promise<{ data: IVisitor[]; totalPages: number }> {
    return await this._visitorRepository.getVisitorsByResident(
      residentId,
      page,
      limit
    );
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
