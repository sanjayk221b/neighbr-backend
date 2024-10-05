import { Request, Response, NextFunction } from "express";
import { DashboardUseCase } from "@/use-cases/dashboard.use-case";
import { ResponseCreator } from "@neighbr/common";
import { NotFoundError } from "@neighbr/common";

export class DashboardController {
  private readonly _dashboardUseCase: DashboardUseCase;

  constructor(dashboardUseCase: DashboardUseCase) {
    this._dashboardUseCase = dashboardUseCase;
  }

  async getAdminDashboardData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dashboardData =
        await this._dashboardUseCase.getAdminDashboardData();

      if (!dashboardData) {
        throw new NotFoundError("Dashboard data not found");
      }

      new ResponseCreator()
        .setData(dashboardData)
        .setStatusCode(200)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getCaretakerDashboardData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const dashboardData =
        await this._dashboardUseCase.getCaretakerDashboardData();

      if (!dashboardData) {
        throw new NotFoundError("Dashboard data not found");
      }

      new ResponseCreator()
        .setData(dashboardData)
        .setStatusCode(200)
        .sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
