import { Request, Response, NextFunction } from "express";
import { AnnouncementsUseCase } from "@/use-cases/announcements.use-case";
import { IAnnouncement } from "@/entities";
import { ResponseCreator } from "@neighbr/common";
import { NotFoundError } from "@neighbr/common";

export class AnnouncementsController {
  private _announcementsUseCase: AnnouncementsUseCase;

  constructor(announcementsUseCase: AnnouncementsUseCase) {
    this._announcementsUseCase = announcementsUseCase;
  }

  async createAnnouncement(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request received for creating a new announcement", req.body);
      const announcementData: Omit<
        IAnnouncement,
        "_id" | "createdAt" | "updatedAt"
      > = req.body;
      const newAnnouncement = await this._announcementsUseCase.addAnnouncement(
        announcementData
      );

      new ResponseCreator()
        .setData(newAnnouncement)
        .setStatusCode(201)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getAllAnnouncements(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const announcements =
        await this._announcementsUseCase.getAllAnnouncements();
      if (!announcements) throw new NotFoundError("No announcements found");

      if (announcements.length > 0) {
        new ResponseCreator()
          .setData(announcements)
          .setStatusCode(200)
          .sendResponse(res);
      } else {
        throw new NotFoundError("No announcements found");
      }
    } catch (error) {
      next(error);
    }
  }
}
