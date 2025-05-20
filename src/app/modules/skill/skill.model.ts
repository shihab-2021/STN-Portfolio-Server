import { model, Schema } from "mongoose";
import { ISkill, SkillModel } from "./skill.interface";

const skillSchema = new Schema<ISkill>(
  {
    iconColor: {
      type: String,
      required: [true, "Please provide icon color"],
    },
    iconLibrary: {
      type: String,
      required: [true, "Please provide icon library"],
    },
    iconName: {
      type: String,
      required: [true, "Please provide icon name"],
    },
    name: {
      type: String,
      required: [true, "Please provide skill name"],
    },
    skillType: {
      type: String,
      required: [true, "Please provide skill type"],
    },
  },
  { timestamps: true },
);

// checking if the skill exist by _id
skillSchema.statics.isSkillExistsById = async function (id: string) {
  return await Skill.findById(id);
};

export const Skill = model<ISkill, SkillModel>("Skill", skillSchema);
