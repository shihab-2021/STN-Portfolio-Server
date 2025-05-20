import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { projectControllers } from "./project.controller";

const router = Router();

router.route("/").post(auth(USER_ROLE.admin), projectControllers.createProject);

router
  .route("/:id")
  .get(projectControllers.getASpecificProject)
  .patch(auth(USER_ROLE.admin), projectControllers.updateProject)
  .delete(auth(USER_ROLE.admin), projectControllers.deleteProject);

router.route("/").get(projectControllers.getAllProjects);

export const projectRoutes = router;
