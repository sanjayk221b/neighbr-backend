import { Request, Response, NextFunction } from "express";
import { VisitorUseCase } from "@/use-cases";
import { IVisitor } from "@/entities";

export class VisitorController {
  private readonly _visitorUseCase: VisitorUseCase;

  constructor(visitorUseCase: VisitorUseCase) {
    this._visitorUseCase = visitorUseCase;
  }

  async createVisitor(req: Request, res: Response, next: NextFunction) {
    try {
      const visitorData: IVisitor = req.body;
      const file = req.file;
      const newVisitor = await this._visitorUseCase.addVisitor(
        visitorData,
        file
      );

      res.status(201).json(newVisitor);
    } catch (error) {
      next(error);
    }
  }

  async getVisitors(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const visitors = await this._visitorUseCase.getVisitors(page, limit);
      res.status(200).json(visitors);
    } catch (error) {
      next(error);
    }
  }

  async getVisitorsByResidentId(req: any, res: Response, next: NextFunction) {
    try {
      const residentId = req.residentId;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const visitors = await this._visitorUseCase.getVisitorsByResidentId(
        residentId,
        page,
        limit
      );

      res.status(200).json(visitors);
    } catch (error: any) {
      next(error);
    }
  }

  async updateVisitor(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const visitorData: IVisitor = req.body;

      const updatedVisitor = await this._visitorUseCase.updateVisitor(
        id,
        visitorData
      );

      res.status(200).json(updatedVisitor);
    } catch (error) {
      next(error);
    }
  }
}
