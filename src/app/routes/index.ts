import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { blogRoutes } from "../modules/blog/blog.router";
import { projectRoutes } from "../modules/project/project.router";
import { messageRoutes } from "../modules/message/message.router";
import { skillRoutes } from "../modules/skill/skill.router";
const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/blogs",
    route: blogRoutes,
  },
  {
    path: "/projects",
    route: projectRoutes,
  },
  {
    path: "/messages",
    route: messageRoutes,
  },
  {
    path: "/skills",
    route: skillRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
