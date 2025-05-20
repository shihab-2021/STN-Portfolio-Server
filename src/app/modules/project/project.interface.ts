import { Model } from "mongoose";

export interface IProject {
  title: string;
  image: string;
  category: string;
  documentation: string;
  tags: string[];
  uploadTime: string;
  uploadDate: string;
  live_link: string;
  git_client: string;
  git_server: string;
  summary: string;
}

export interface ProjectModel extends Model<IProject> {
  isProjectExistsById(id: string): Promise<IProject>;
}
