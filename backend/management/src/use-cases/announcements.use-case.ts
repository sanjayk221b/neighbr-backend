import { IAnnouncement } from "@/entities";
import { IAnnouncementRepository } from "@/infrastructure/repositories/interfaces/announcements-repository.interface";

export class AnnouncementsUseCase {
  private readonly _announcementRepository: IAnnouncementRepository;

  constructor(announcementRepository: IAnnouncementRepository) {
    this._announcementRepository = announcementRepository;
  }

  async addAnnouncement(
    announcementData: Omit<IAnnouncement, "_id" | "createdAt" | "updatedAt">
  ): Promise<IAnnouncement> {
    return await this._announcementRepository.createAnnouncement(announcementData);
  }

  async getAllAnnouncements(): Promise<IAnnouncement[] | null> {
    return await this._announcementRepository.getAnnouncements();
  }
}
