import { Request, Response, NextFunction } from "express";
import { VisitorUseCase } from "@/use-cases";
import { IVisitor } from "@/entities";

export class VisitorController {
  private readonly _visitorUseCase: VisitorUseCase;

  constructor(visitorUseCase: VisitorUseCase) {
    this._visitorUseCase = visitorUseCase;
  }

  async createVisitor(req: Request, res: Response) {
    try {
      const visitorData: IVisitor = req.body;
      const file = req.file;
      const newVisitor = await this._visitorUseCase.addVisitor(
        visitorData,
        file
      );

      res.status(201).json(newVisitor);
    } catch (error) {
      console.error("Error creating visitor:", error);
      res.status(500).json({ message: "Error creating visitor", error });
    }
  }

  async getVisitors(req: Request, res: Response) {
    try {
      const visitors = await this._visitorUseCase.getVisitors();
      res.status(200).json(visitors);
    } catch (error) {
      res.status(500).json({ message: "Error while fetching visitors", error });
    }
  }

  async updateVisitor(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const visitorData: IVisitor = req.body;

      const updatedVisitor = await this._visitorUseCase.updateVisitor(
        id,
        visitorData
      );

      res.status(200).json(updatedVisitor);
    } catch (error) {
      console.error("Error updating visitor:", error);
      res.status(500).json({ message: "Error updating visitor", error });
    }
  }
}
