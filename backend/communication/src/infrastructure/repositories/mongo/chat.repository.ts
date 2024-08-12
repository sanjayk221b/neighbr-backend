import { IMessage, IConversation, IParticipant } from "@/entities";
import { IChatRepository } from "../interfaces";
import MessageModel from "./models/message.model";
import ConversationModel from "./models/conversation.model";
import Resident from "./models/resident.model";
import Caretaker from "./models/caretaker.model";

export class ChatRepository implements IChatRepository {
  async createConversation(
    conversation: IConversation
  ): Promise<IConversation> {
    const newConversation = new ConversationModel(conversation);
    await newConversation.save();

    const populatedParticipants = await Promise.all(
      newConversation.participants.map(async (participant: IParticipant) => {
        if (participant.type === "resident") {
          const resident = await Resident.findById(participant._id)
            .lean()
            .exec();
          return {
            ...participant,
            name: resident?.name,
            image: resident?.image,
          };
        } else if (participant.type === "caretaker") {
          const caretaker = await Caretaker.findById(participant._id)
            .lean()
            .exec();
          return {
            ...participant,
            name: caretaker?.name,
            image: caretaker?.imageUrl,
          };
        }
        return participant;
      })
    );

    return {
      ...newConversation.toObject(),
      participants: populatedParticipants,
    };
  }

  async createMessage(message: IMessage): Promise<IMessage> {
    const newMessage = new MessageModel(message);
    await newMessage.save();
    await ConversationModel.findByIdAndUpdate(message.conversationId, {
      lastMessage: newMessage._id,
    });
    return newMessage;
  }

  async getMessagesByConversationId(
    conversationId: string
  ): Promise<IMessage[]> {
    return MessageModel.find({ conversationId }).sort({ createdAt: 1 });
  }

  async getConversationsByUserId(userId: string): Promise<IConversation[]> {
    const conversations = await ConversationModel.find({
      "participants._id": userId,
    })
      .sort({ updatedAt: -1 })
      .populate("lastMessage")
      .lean()
      .exec();

    const populatedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        const participants = await Promise.all(
          conversation.participants.map(async (participant: IParticipant) => {
            if (participant.type === "resident") {
              const resident = await Resident.findById(participant._id)
                .lean()
                .exec();
              return {
                ...participant,
                name: resident?.name,
                image: resident?.image,
              };
            } else if (participant.type === "caretaker") {
              const caretaker = await Caretaker.findById(participant._id)
                .lean()
                .exec();
              return {
                ...participant,
                name: caretaker?.name,
                image: caretaker?.imageUrl,
              };
            }
            return participant;
          })
        );
        return { ...conversation, participants };
      })
    );

    return populatedConversations;
  }
}
