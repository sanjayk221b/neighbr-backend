import { IReport } from "@/entities";
import { IReportRepository } from "@/infrastructure/repositories/interfaces";
import { BadRequestError } from "@neighbr/common";

export class ReportsUseCase {
  private readonly _reportRepository: IReportRepository;

  constructor(reportRepository: IReportRepository) {
    this._reportRepository = reportRepository;
  }

  async createReport(report: IReport): Promise<IReport> {
    if (!report.postId || !report.reporterId || !report.reason) {
      throw new BadRequestError("Missing required fields");
    }
    return this._reportRepository.createReport(report);
  }

  async getReports(page: number, limit: number): Promise<IReport[]> {
    return this._reportRepository.getAllReports(page, limit);
  }
}
