import { Request, Response, NextFunction } from "express";
import { VisitorUseCase } from "@/use-cases";
import { IVisitor } from "@/entities";
import { ResponseCreator, NotFoundError, statusCodes } from "@neighbr/common";

export class VisitorController {
  private readonly _visitorUseCase: VisitorUseCase;

  constructor(visitorUseCase: VisitorUseCase) {
    this._visitorUseCase = visitorUseCase;
  }

  async createVisitor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const visitorData: IVisitor = req.body;
      const file = req.file;
      const newVisitor = await this._visitorUseCase.addVisitor(
        visitorData,
        file
      );

      new ResponseCreator()
        .setData(newVisitor)
        .setMessage("Visitor created successfully")
        .setStatusCode(statusCodes.CREATED)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getVisitors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const visitors = await this._visitorUseCase.getVisitors(page, limit);

      if (!visitors || visitors.length === 0) {
        throw new NotFoundError("No visitors found");
      }

      new ResponseCreator()
        .setData(visitors)
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getVisitorsByResidentId(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const residentId = req.residentId;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const visitors = await this._visitorUseCase.getVisitorsByResidentId(
        residentId,
        page,
        limit
      );

      new ResponseCreator()
        .setData(visitors)
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async updateVisitor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const visitorData: IVisitor = req.body;

      const updatedVisitor = await this._visitorUseCase.updateVisitor(
        id,
        visitorData
      );

      if (!updatedVisitor) {
        throw new NotFoundError("Visitor not found or could not be updated");
      }

      new ResponseCreator()
        .setData(updatedVisitor)
        .setMessage("Visitor updated successfully")
        .setStatusCode(statusCodes.OK)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
