import { Model } from "mongoose";

export interface IMessage {
  email: string;
  name: string;
  subject: string;
  message: string;
  date: string;
  time: string;
}

export interface MessageModel extends Model<IMessage> {
  isMessageExistsById(id: string): Promise<IMessage>;
}
