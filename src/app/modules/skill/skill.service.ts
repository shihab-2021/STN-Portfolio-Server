import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import { ISkill } from "./skill.interface";
import { Skill } from "./skill.model";

const createSkill = async (payload: ISkill) => {
  const createdSkill = await Skill.create(payload);

  // populate author details
  const result = await Skill.findById(createdSkill._id);

  return result;
};

const deleteSkill = async (id: string) => {
  // checking skill exists
  const skill = await Skill.isSkillExistsById(id);
  if (!skill) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Not Found Error: Skill does not exists!",
      "NOT_FOUND_ERROR",
    );
  }

  // update the isDelete in db
  const updateIsDelete = await Skill.findByIdAndDelete(id);

  return updateIsDelete;
};

const getAllSkills = async (query: Record<string, unknown>) => {
  const searchableFields = ["name"];
  const skills = new QueryBuilder(Skill.find(), query)
    .search(searchableFields)
    .sort()
    .filter();

  const result = await skills.modelQuery;
  return result;
};

export const skillServices = {
  createSkill,
  deleteSkill,
  getAllSkills,
};
