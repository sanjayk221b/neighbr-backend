import { IReport } from "@/entities";
import { IReportRepository } from "../interfaces";
import Report from "./models/report.model";

export class ReportRepository implements IReportRepository {
  async createReport(report: IReport): Promise<IReport> {
    const newReport = new Report(report);
    return newReport.save();
  }

  async getAllReports(page: number, limit: number): Promise<IReport[]> {
    const skip = (page - 1) * limit;
    return Report.find().skip(skip).limit(limit).exec();
  }
}
