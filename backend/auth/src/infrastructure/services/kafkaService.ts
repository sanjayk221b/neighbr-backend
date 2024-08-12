import { IResident, ICaretaker } from "@/entities";
import {
  sendResidentCreatedEvent,
  sendResidentUpdatedEvent,
  sendCaretakerCreatedEvent,
  sendCaretakerUpdatedEvent,
} from "@/events/kafka/producers";

export class KafkaService {
  async sendResidentCreatedEvent(data: IResident): Promise<void> {
    await sendResidentCreatedEvent(data);
  }

  async sendResidentUpdatedEvent(data: IResident): Promise<void> {
    await sendResidentUpdatedEvent(data);
  }

  async sendCaretakerCreatedEvent(data: ICaretaker): Promise<void> {
    await sendCaretakerCreatedEvent(data);
  }
  async sendCaretakerUpdatedEvent(data: ICaretaker): Promise<void> {
    await sendCaretakerUpdatedEvent(data);
  }
}
