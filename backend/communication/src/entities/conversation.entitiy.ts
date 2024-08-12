export interface IParticipant {
  _id: string;
  type: "resident" | "caretaker" | "admin";
}

export interface IConversation {
  _id?: string;
  participants: IParticipant[];
  isGroup: boolean;
  groupName?: string;
  groupAdmins?: string[];
  lastMessage?: string;
}
