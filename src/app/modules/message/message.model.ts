import { model, Schema } from "mongoose";
import { IMessage, MessageModel } from "./message.interface";

const messageSchema = new Schema<IMessage>(
  {
    email: {
      type: String,
      required: [true, "Please provide email"],
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    subject: {
      type: String,
      required: [true, "Please provide subject"],
    },
    message: {
      type: String,
      required: [true, "Please provide message"],
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true },
);

// checking if the message exist by _id
messageSchema.statics.isMessageExistsById = async function (id: string) {
  return await Message.findById(id);
};

export const Message = model<IMessage, MessageModel>("Message", messageSchema);
