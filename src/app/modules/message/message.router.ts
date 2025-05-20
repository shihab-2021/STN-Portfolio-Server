import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { messageControllers } from "./message.controller";

const router = Router();

router.route("/").post(messageControllers.createMessage);

router
  .route("/:id")
  .get(messageControllers.getASpecificMessage)
  .patch(auth(USER_ROLE.admin), messageControllers.updateMessage)
  .delete(auth(USER_ROLE.admin), messageControllers.deleteMessage);

router.route("/").get(messageControllers.getAllMessages);

export const messageRoutes = router;
