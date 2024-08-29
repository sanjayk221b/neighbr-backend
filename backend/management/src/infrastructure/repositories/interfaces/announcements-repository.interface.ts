import { IAnnouncement } from "@/entities";

export interface IAnnouncementRepository {
  createAnnouncement(
    announcementData: Omit<IAnnouncement, "_id" | "createdAt" | "updatedAt">
  ): Promise<IAnnouncement>;
  getAnnouncements(): Promise<IAnnouncement[]>;
}
