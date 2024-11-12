import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { ResponseMessage } from "../utils/ResponseMessage.js";
import { CatchErrorHandler } from "../services/CommonService.js";

export const UserAuth = async (req, res, next) => {
  const token = req.header("auth");
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: ResponseMessage.TOKEN_REQUIRED,
      data: [],
    });
  } else {
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      if (decode.user.id) {
        let findUser = await User.findOne({
          _id: decode.user.id,
        });
        if (!findUser) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            status: StatusCodes.UNAUTHORIZED,
            message: ResponseMessage.ACCOUNT_DELETED,
            data: [],
          });
        }
        if (findUser.is_deleted) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            status: StatusCodes.UNAUTHORIZED,
            message: ResponseMessage.ACCOUNT_DELETED,
            data: [],
          });
        }
        if (!findUser.isActive) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            status: StatusCodes.UNAUTHORIZED,
            message: ResponseMessage.USER_DISABLE_BY_ADMIN,
            data: [],
          });
        }
        req.user = decode.user.id;
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: StatusCodes.UNAUTHORIZED,
          message: ResponseMessage.INVALID_TOKEN,
          data: [],
        });
      }
      next();
    } catch (error) {
      return CatchErrorHandler(res, error);
    }
  }
};
