import { IBlog } from "./blog.interface";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { Blog } from "./blog.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createBlog = async (payload: IBlog) => {
  const createdBlog = await Blog.create(payload);

  // populate author details
  const result = await Blog.findById(createdBlog._id);

  return result;
};

const getASpecificBlog = async (blogId: string) => {
  const result = await Blog.findById(blogId);

  if (result === null) {
    throw new Error("Blog does not exists!");
  }

  return result;
};

const updateBlog = async (id: string, payload: IBlog) => {
  // checking blog exists
  const blog = await Blog.isBlogExistsById(id);
  if (!blog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Not Found Error: Blog does not exists!",
      "NOT_FOUND_ERROR",
    );
  }

  // update the blog in db
  await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  // populate author details
  const result = await Blog.findById(id);

  return result;
};

const deleteBlog = async (id: string) => {
  // checking blog exists
  const blog = await Blog.isBlogExistsById(id);
  if (!blog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Not Found Error: Blog does not exists!",
      "NOT_FOUND_ERROR",
    );
  }

  // update the isDelete in db
  const updateIsDelete = await Blog.findByIdAndDelete(id);

  return updateIsDelete;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const searchableFields = ["title", "content"];
  const blogs = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .sort()
    .filter();

  const result = await blogs.modelQuery;
  return result;
};

export const blogServices = {
  createBlog,
  getASpecificBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
