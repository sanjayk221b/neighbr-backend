import { IMessage, IConversation } from "@/entities";

export interface IChatRepository {
  createConversation(conversation: IConversation): Promise<IConversation>;
  getConversationsByUserId(userId: string): Promise<IConversation[]>;
  createMessage(message: IMessage): Promise<IMessage>;
  getMessagesByConversationId(conversationId: string): Promise<IMessage[]>;
}