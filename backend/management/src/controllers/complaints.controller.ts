import { NextFunction, Request, Response } from "express";
import { ComplaintsUseCase } from "@/use-cases/complaints.use-case";
import { IComplaint } from "@/entities";

export class ComplaintsController {
  private readonly _complaintsUseCase: ComplaintsUseCase;

  constructor(complaintsUseCase: ComplaintsUseCase) {
    this._complaintsUseCase = complaintsUseCase;
  }
  async addComplaint(
    req: any,
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

      res.status(201).json(newComplaint);
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
      const complaints = await this._complaintsUseCase.getComplaintsByResident(
        residentId
      );
      res.status(200).json(complaints);
    } catch (error) {
      next(error);
    }
  }

  async getAllComplaints(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const complaints = await this._complaintsUseCase.getAllComplaints();
      res.status(200).json(complaints);
    } catch (error) {
      next(error);
    }
  }

  async updateComplaint(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: complaintId, data: updateData } = req.body;

      const updatedComplaint = await this._complaintsUseCase.updateComplaint(
        complaintId,
        updateData
      );
      res.status(200).json(updatedComplaint);
    } catch (error) {
      next(error);
    }
  }

  
}
