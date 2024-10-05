import {
  ComplaintsRepository,
  ServicesRepository,
  WorkerRepository,
  VisitorRepository,
  ResidentRepository,
} from "@/infrastructure/repositories/mongo";

export class DashboardUseCase {
  private readonly _complaintsRepository: ComplaintsRepository;
  private readonly _servicesRepository: ServicesRepository;
  private readonly _workerRepository: WorkerRepository;
  private readonly _visitorRepository: VisitorRepository;
  private readonly _residentRepository: ResidentRepository;

  constructor(
    complaintsRepository: ComplaintsRepository,
    servicesRepository: ServicesRepository,
    workerRepository: WorkerRepository,
    visitorRepository: VisitorRepository,
    residentRepository: ResidentRepository
  ) {
    this._complaintsRepository = complaintsRepository;
    this._servicesRepository = servicesRepository;
    this._workerRepository = workerRepository;
    this._visitorRepository = visitorRepository;
    this._residentRepository = residentRepository;
  }

  async getAdminDashboardData() {
    const [residentsCount, workersCount, pendingComplaintsCount] =
      await Promise.all([
        this._residentRepository.count(),
        this._workerRepository.count(),
        this._complaintsRepository.pendingComplaintsCount(),
      ]);

    return {
      residentsCount,
      workersCount,
      pendingComplaintsCount,
    };
  }

  async getCaretakerDashboardData() {
    const [
      pendingServiceRequestsCount,
      pendingComplaintsCount,
      pendingVisitorRequestsCount,
    ] = await Promise.all([
      this._servicesRepository.pendingServiceRequestsCount(),
      this._complaintsRepository.pendingComplaintsCount(),
      this._visitorRepository.pendingVisitorRequests(),
    ]);

    return {
      pendingServiceRequestsCount,
      pendingComplaintsCount,
      pendingVisitorRequestsCount,
    };
  }
}
