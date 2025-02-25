import { Request, Response, NextFunction } from "express";
import { ComplaintsUseCase } from "@/use-cases/complaints.use-case";
import { IComplaint } from "@/entities";
import { ResponseCreator, NotFoundError, statusCodes } from "@neighbr/common";

export class ComplaintsController {
  private readonly _complaintsUseCase: ComplaintsUseCase;

  constructor(complaintsUseCase: ComplaintsUseCase) {
    this._complaintsUseCase = complaintsUseCase;
  }

  async addComplaint(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const complaintData: IComplaint = {
        ...req.body,
        residentId: req.residentId,
      };

      const file = req.file;

      const newComplaint = await this._complaintsUseCase.addComplaint(
        complaintData,
        file
      );

      new ResponseCreator()
        .setData(newComplaint)
        .setStatusCode(statusCodes.CREATED)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getComplaintsByResident(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const residentId = req.residentId;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search || "";

      const data = await this._complaintsUseCase.getComplaintsByResident(
        residentId,
        page,
        limit,
        search
      );

      new ResponseCreator()
        .setData(data)
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getComplaintsByAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const complaints = await this._complaintsUseCase.getComplaintsByAdmin(
        page,
        limit
      );

      if (!complaints || complaints.length === 0) {
        throw new NotFoundError("No complaints found for admin");
      }

      new ResponseCreator()
        .setData(complaints)
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getComplaintsByCaretaker(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const complaints = await this._complaintsUseCase.getComplaintsByCaretaker(
        page,
        limit
      );

      if (!complaints || complaints.length === 0) {
        throw new NotFoundError("No complaints found for caretaker");
      }

      new ResponseCreator()
        .setData(complaints)
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async updateComplaint(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id: complaintId, data: updateData } = req.body;

      const updatedComplaint = await this._complaintsUseCase.updateComplaint(
        complaintId,
        updateData
      );

      if (!updatedComplaint) {
        throw new NotFoundError("Complaint not found or could not be updated");
      }

      new ResponseCreator()
        .setData(updatedComplaint)
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
