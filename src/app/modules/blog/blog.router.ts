import { Router } from "express";
import { blogControllers } from "./blog.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.route("/").post(auth(USER_ROLE.admin), blogControllers.createBlog);

router
  .route("/:id")
  .get(blogControllers.getASpecificBlog)
  .patch(auth(USER_ROLE.admin), blogControllers.updateBlog)
  .delete(auth(USER_ROLE.admin), blogControllers.deleteBlog);

router.route("/").get(blogControllers.getAllBlogs);

export const blogRoutes = router;
