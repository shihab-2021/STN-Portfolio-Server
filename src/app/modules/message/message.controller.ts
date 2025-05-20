import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { messageServices } from "./message.service";

const createMessage = catchAsync(async (req, res) => {
  const result = await messageServices.createMessage(req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: "Message created successfully!",
    data: result,
  });
});

const getASpecificMessage = catchAsync(async (req, res) => {
  const result = await messageServices.getASpecificMessage(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Message fetched successfully!",
    data: result,
  });
});

const updateMessage = catchAsync(async (req, res) => {
  const result = await messageServices.updateMessage(req.params.id, req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Message updated successfully!",
    data: result,
  });
});

const deleteMessage = catchAsync(async (req, res) => {
  await messageServices.deleteMessage(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Message deleted successfully!",
    data: null,
  });
});

const getAllMessages = catchAsync(async (req, res) => {
  const result = await messageServices.getAllMessages(req.query);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Messages fetched successfully!",
    data: result,
  });
});

export const messageControllers = {
  createMessage,
  getASpecificMessage,
  updateMessage,
  deleteMessage,
  getAllMessages,
};
