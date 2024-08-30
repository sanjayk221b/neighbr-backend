import {
  ComplaintsRepository,
  ServicesRepository,
  WorkerRepository,
  VisitorRepository,
} from "@/infrastructure/repositories/mongo";

export class DashboardUseCase {
  private readonly _complaintsRepository: ComplaintsRepository;
  private readonly _servicesRepository: ServicesRepository;
  private readonly _workerRepository: WorkerRepository;
  private readonly _visitorRepository: VisitorRepository;

  constructor(
    complaintsRepository: ComplaintsRepository,
    servicesRepository: ServicesRepository,
    workerRepository: WorkerRepository,
    visitorRepository: VisitorRepository
  ) {
    this._complaintsRepository = complaintsRepository;
    this._servicesRepository = servicesRepository;
    this._workerRepository = workerRepository;
    this._visitorRepository = visitorRepository;
  }
}
