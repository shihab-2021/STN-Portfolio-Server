import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServices.createBlog(req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: "Blog created successfully!",
    data: result,
  });
});

const getASpecificBlog = catchAsync(async (req, res) => {
  const result = await blogServices.getASpecificBlog(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Blog fetched successfully!",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const result = await blogServices.updateBlog(req.params.id, req.body);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Blog updated successfully!",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  await blogServices.deleteBlog(req.params.id);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Blog deleted successfully!",
    data: null,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogs(req.query);
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: "Blogs fetched successfully!",
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  getASpecificBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
