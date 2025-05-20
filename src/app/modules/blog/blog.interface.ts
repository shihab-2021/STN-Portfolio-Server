import { Model } from "mongoose";

export interface IBlog {
  title: string;
  category: string;
  documentation: string;
  image: string;
  tags: string[];
  uploadTime: string;
  uploadDate: string;
}

export interface BlogModel extends Model<IBlog> {
  isBlogExistsById(id: string): Promise<IBlog>;
}
