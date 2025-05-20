import { model, Schema } from "mongoose";
import { BlogModel, IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
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
  },
  { timestamps: true },
);

// checking if the blog exist by _id
blogSchema.statics.isBlogExistsById = async function (id: string) {
  return await Blog.findById(id);
};

export const Blog = model<IBlog, BlogModel>("Blog", blogSchema);
