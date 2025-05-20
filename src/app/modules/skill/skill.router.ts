import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { skillControllers } from "./skill.controller";

const router = Router();

router.route("/").post(skillControllers.createSkill);

router
  .route("/:id")
  .delete(auth(USER_ROLE.admin), skillControllers.deleteSkill);

router.route("/").get(skillControllers.getAllSkills);

export const skillRoutes = router;
