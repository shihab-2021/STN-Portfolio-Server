import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import { IMessage } from "./message.interface";
import { Message } from "./message.model";

const createMessage = async (payload: IMessage) => {
  const createdMessage = await Message.create(payload);

  // populate author details
  const result = await Message.findById(createdMessage._id);

  return result;
};

const getASpecificMessage = async (messageId: string) => {
  const result = await Message.findById(messageId);

  if (result === null) {
    throw new Error("Message does not exists!");
  }

  return result;
};

const updateMessage = async (id: string, payload: IMessage) => {
  // checking message exists
  const message = await Message.isMessageExistsById(id);
  if (!message) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Not Found Error: Message does not exists!",
      "NOT_FOUND_ERROR",
    );
  }

  // update the message in db
  await Message.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  // populate author details
  const result = await Message.findById(id);

  return result;
};

const deleteMessage = async (id: string) => {
  // checking message exists
  const message = await Message.isMessageExistsById(id);
  if (!message) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Not Found Error: Message does not exists!",
      "NOT_FOUND_ERROR",
    );
  }

  // update the isDelete in db
  const updateIsDelete = await Message.findByIdAndDelete(id);

  return updateIsDelete;
};

const getAllMessages = async (query: Record<string, unknown>) => {
  const searchableFields = ["title", "content"];
  const messages = new QueryBuilder(Message.find(), query)
    .search(searchableFields)
    .sort()
    .filter();

  const result = await messages.modelQuery;
  return result;
};

export const messageServices = {
  createMessage,
  getASpecificMessage,
  updateMessage,
  deleteMessage,
  getAllMessages,
};
