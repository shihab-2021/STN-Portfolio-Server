import { model, Schema } from "mongoose";
import { IProject, ProjectModel } from "./project.interface";

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Please provide blog title"],
    },
    category: {
      type: String,
      required: [true, "Please provide blog content"],
    },
    documentation: {
      type: String,
      required: [true, "Please provide blog documentation"],
    },
    image: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    uploadDate: {
      type: String,
    },
    uploadTime: {
      type: String,
    },
    live_link: {
      type: String,
    },
    git_client: {
      type: String,
    },
    git_server: {
      type: String,
    },
    summary: {
      type: String,
    },
  },
  { timestamps: true },
);

// checking if the blog exist by _id
projectSchema.statics.isProjectExistsById = async function (id: string) {
  return await Project.findById(id);
};

export const Project = model<IProject, ProjectModel>("Project", projectSchema);
