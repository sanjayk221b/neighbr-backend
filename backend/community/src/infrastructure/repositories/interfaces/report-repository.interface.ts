import { IReport } from "@/entities";

export interface IReportRepository {
  createReport(report: IReport): Promise<IReport>;
  getAllReports(page?: number, limit?: number): Promise<IReport[]>;
}
