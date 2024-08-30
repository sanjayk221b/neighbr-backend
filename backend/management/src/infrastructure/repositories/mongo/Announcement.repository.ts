import { IAnnouncement } from "@/entities";
import Announcement from "./models/announcements.model";
import { IAnnouncementRepository } from "../interfaces/announcements-repository.interface";

export class AnnouncementRepository implements IAnnouncementRepository {
  async createAnnouncement(
    announcementData: Omit<IAnnouncement, "_id" | "createdAt" | "updatedAt">
  ): Promise<IAnnouncement> {
    const announcement = new Announcement(announcementData);
    return await announcement.save();
  }

  async getAnnouncements(): Promise<IAnnouncement[]> {
    return await Announcement.find().exec();
  }
}

