import { Model } from "mongoose";

export interface ISkill {
  iconColor: string;
  iconLibrary: string;
  iconName: string;
  name: string;
  skillType: string;
}

export interface SkillModel extends Model<ISkill> {
  isSkillExistsById(id: string): Promise<ISkill>;
}
