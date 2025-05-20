import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { skillServices } from "./skill.service";

const createSkill = catchAsync(async (req, res) => {
  const result = await skillServices.createSkill(req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: "Skill created successfully!",
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  await skillServices.deleteSkill(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Skill deleted successfully!",
    data: null,
  });
});

const getAllSkills = catchAsync(async (req, res) => {
  const result = await skillServices.getAllSkills(req.query);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Skills fetched successfully!",
    data: result,
  });
});

export const skillControllers = {
  createSkill,
  deleteSkill,
  getAllSkills,
};
