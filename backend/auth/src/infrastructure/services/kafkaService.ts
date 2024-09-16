import { IResident, ICaretaker, IOTP } from "@/entities";
import {
  sendResidentCreatedEvent,
  sendResidentUpdatedEvent,
  sendCaretakerCreatedEvent,
  sendCaretakerUpdatedEvent,
  sendOtpGeneratedEvent,
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

  async sendOtpGeneratedEvent(data: IOTP): Promise<void> {
    await sendOtpGeneratedEvent(data);
  }
}
