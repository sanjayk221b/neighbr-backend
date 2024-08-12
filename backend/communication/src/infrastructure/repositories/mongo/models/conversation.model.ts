import mongoose, { Schema, Document } from "mongoose";
import { IConversation, IParticipant } from "@/entities";

const participantSchema = new Schema<IParticipant>({
  _id: {
    type: String,
    required: true,
    refPath: "participants.type",
  },
  type: {
    type: String,
    enum: ["resident", "caretaker"],
    required: true,
  },
});

const conversationSchema = new Schema<IConversation>(
  {
    participants: [participantSchema],
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      default: "",
    },
    groupAdmins: [
      {
        type: String,
        ref: "Participant",
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

conversationSchema.index({ "participants.id": 1, "participants.type": 1 });

const Conversation = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);
export default Conversation;
