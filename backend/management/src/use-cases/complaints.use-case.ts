import { IComplaint } from "@/entities";
import { ComplaintsRepository } from "@/infrastructure/repositories/mongo/complaints.repository";
import { Cloudinary } from "@/infrastructure/services/cloudinary";

export class ComplaintsUseCase {
  private readonly _complaintsRepository: ComplaintsRepository;
  private readonly _cloudinary: Cloudinary;

  constructor(
    complaintsRepository: ComplaintsRepository,
    cloudinary: Cloudinary
  ) {
    this._complaintsRepository = complaintsRepository;
    this._cloudinary = cloudinary;
  }

  async addComplaint(
    complaintData: IComplaint,
    file?: Express.Multer.File
  ): Promise<IComplaint> {
    if (file) {
      try {
        const result = await this._cloudinary.upload(file);
        complaintData.image = result;
      } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
        throw new Error("Image upload failed");
      }
    }

    return await this._complaintsRepository.addComplaint(complaintData);
  }

  async getComplaintsByResident(residentId: string): Promise<IComplaint[]> {
    return await this._complaintsRepository.getComplaintsByResident(residentId);
  }

  async getAllComplaints(): Promise<IComplaint[]> {
    return await this._complaintsRepository.getAllComplaints();
  }

  async updateComplaint(complaintId: string, updateData: Partial<IComplaint>): Promise<IComplaint> {
    return await this._complaintsRepository.updateComplaint(complaintId, updateData);
  }
}
