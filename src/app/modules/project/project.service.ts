import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import { IProject } from "./project.interface";
import { Project } from "./project.model";

const createProject = async (payload: IProject) => {
  const createdProject = await Project.create(payload);

  // populate author details
  const result = await Project.findById(createdProject._id);

  return result;
};

const getASpecificProject = async (projectId: string) => {
  const result = await Project.findById(projectId);

  if (result === null) {
    throw new Error("Project does not exists!");
  }

  return result;
};

const updateProject = async (id: string, payload: IProject) => {
  // checking project exists
  const project = await Project.isProjectExistsById(id);
  if (!project) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Not Found Error: Project does not exists!",
      "NOT_FOUND_ERROR",
    );
  }

  // update the project in db
  await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  // populate author details
  const result = await Project.findById(id);

  return result;
};

const deleteProject = async (id: string) => {
  // checking project exists
  const project = await Project.isProjectExistsById(id);
  if (!project) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Not Found Error: Project does not exists!",
      "NOT_FOUND_ERROR",
    );
  }

  // update the isDelete in db
  const updateIsDelete = await Project.findByIdAndDelete(id);

  return updateIsDelete;
};

const getAllProjects = async (query: Record<string, unknown>) => {
  const searchableFields = ["title", "content"];
  const projects = new QueryBuilder(Project.find(), query)
    .search(searchableFields)
    .sort()
    .filter();

  const result = await projects.modelQuery;
  return result;
};

export const projectServices = {
  createProject,
  getASpecificProject,
  updateProject,
  deleteProject,
  getAllProjects,
};
