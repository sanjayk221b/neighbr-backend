import { Request, Response, NextFunction } from "express";
import { DashboardUseCase } from "@/use-cases/dashboard.use-case";

export class DashboardController {
  private readonly _dashboardUseCase: DashboardUseCase;

  constructor(dashboardUseCase: DashboardUseCase) {
    this._dashboardUseCase = dashboardUseCase;
  }
}
