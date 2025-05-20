import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { ILoginUser, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { Project } from "../project/project.model";
import { Blog } from "../blog/blog.model";
import { Message } from "../message/message.model";

const registerUser = async (payload: IUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "User with this email already exists!",
    );
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser) => {
  // checking if the user is exists
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Not Found Error: User does not exists!",
      "NOT_FOUND_ERROR",
    );
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Authorization Error: This user is deleted!",
      "AUTHORIZATION_ERROR",
    );
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;
  if (userStatus === true) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Authorization Error: This user is blocked!",
      "AUTHORIZATION_ERROR",
    );
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Authorization Error: Password didn't matched!",
      "AUTHORIZATION_ERROR",
    );
  }

  // creating token
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload as { role: string; email: string },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload as { role: string; email: string },
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  // token validation checking
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  const { email, iat } = decoded;

  // checking user's existence
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Not Found Error: User does not exists!",
      "NOT_FOUND_ERROR",
    );
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;
  if (userStatus === true) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Authorization Error: This user is blocked!",
      "AUTHORIZATION_ERROR",
    );
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Authorization Error: You are not authorized!",
      "AUTHORIZATION_ERROR",
    );
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload as { role: string; email: string },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

const getUserProfileData = async (payload: JwtPayload) => {
  // checking user's existence
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Not Found Error: User does not exists!",
      "NOT_FOUND_ERROR",
    );
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Authorization Error: This user is deleted!",
      "AUTHORIZATION_ERROR",
    );
  }

  // checking if the user is blocked
  const userStatus = user?.isBlocked;
  if (userStatus === true) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Authorization Error: This user is blocked!",
      "AUTHORIZATION_ERROR",
    );
  }

  user.password = "";

  return user;
};

const getDashboardState = async () => {
  // Get counts in parallel
  const [projectCount, blogCount, messageCount] = await Promise.all([
    Project.countDocuments(),
    Blog.countDocuments(),
    Message.countDocuments(),
  ]);

  // Get latest entries in parallel
  const [latestProjects, latestBlogs, latestMessages] = await Promise.all([
    Project.find().sort({ uploadDate: -1 }).limit(3).lean(),
    Blog.find().sort({ uploadDate: -1 }).limit(3).lean(),
    Message.find().sort({ date: -1 }).limit(3).lean(),
  ]);

  // Format dates to match your frontend format
  const formatEntry = (entry: any) => ({
    ...entry,
    _id: entry._id.toString(),
  });

  return {
    stats: {
      projects: projectCount,
      blogs: blogCount,
      messages: messageCount,
    },
    latest: {
      projects: latestProjects.map(formatEntry),
      blogs: latestBlogs.map(formatEntry),
      messages: latestMessages.map((message: any) => ({
        ...message,
        _id: message._id.toString(),
        date: new Date(message.date).toLocaleDateString("en-US"),
        time: new Date(message.date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      })),
    },
  };
};

export const authServices = {
  registerUser,
  loginUser,
  refreshToken,
  getUserProfileData,
  getDashboardState,
};
