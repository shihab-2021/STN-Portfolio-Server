import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { projectServices } from "./project.service";

const createProject = catchAsync(async (req, res) => {
  const result = await projectServices.createProject(req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: "Project created successfully!",
    data: result,
  });
});

const getASpecificProject = catchAsync(async (req, res) => {
  const result = await projectServices.getASpecificProject(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Project fetched successfully!",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const result = await projectServices.updateProject(req.params.id, req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Project updated successfully!",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  await projectServices.deleteProject(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Project deleted successfully!",
    data: null,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await projectServices.getAllProjects(req.query);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Projects fetched successfully!",
    data: result,
  });
});

export const projectControllers = {
  createProject,
  getASpecificProject,
  updateProject,
  deleteProject,
  getAllProjects,
};
