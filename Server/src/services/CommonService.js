import { StatusCodes } from "http-status-codes";
import { ResponseMessage } from "../utils/ResponseMessage.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const genrateToken = ({ payload }) => {
  return jwt.sign(payload, process.env.SECRET_KEY);
};

export async function passwordCompare(plainPassword, hashPassword) {
  if (!plainPassword || !hashPassword) {
    return {
      status: StatusCodes.BAD_REQUEST,
      message: ResponseMessage.PASSWORD_REQUIRED,
    };
  }
  return await bcrypt.compare(plainPassword, hashPassword);
}

export const generatePassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
};

export function CatchErrorHandler(res, error) {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: ResponseMessage.INTERNAL_SERVER_ERROR,
    data: error.message,
  });
}
