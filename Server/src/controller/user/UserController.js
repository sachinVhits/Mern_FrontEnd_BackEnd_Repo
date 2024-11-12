import User from "../../models/User.js";
import Task from "../../models/Task.js";
import { StatusCodes } from "http-status-codes";
import {
  generatePassword,
  passwordCompare,
  genrateToken,
} from "../../services/CommonService.js";
import { ResponseMessage } from "../../utils/ResponseMessage.js";
export const addUser = async (req, res) => {
  try {
    const { fullName, email, password, mobileNumber } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.USER_ALREADY_EXIST_EMAIL,
        data: [],
      });
    }
    const hashPassword = await generatePassword(password);
    const addUser = await User.create({
      fullName,
      email,
      password: hashPassword,
      mobileNumber,
    });
    if (addUser) {
      return res.status(StatusCodes.CREATED).json({
        status: StatusCodes.CREATED,
        message: ResponseMessage.USER_CREATE_SUCCESS,
        data: addUser,
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      data: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.USER_NOT_FOUND,
        data: [],
      });
    }
    const isMatched = await passwordCompare(password, findUser.password);
    if (!isMatched) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: ResponseMessage.INVALID_PASSWORD,
        data: [],
      });
    }
    const payload = {
      user: {
        id: findUser._id,
      },
    };
    const token = genrateToken({
      payload,
    });
    if (token) {
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessage.USER_LOGIN_SUCCESS,
        data: { ...findUser._doc, token },
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      data: error.message,
    });
  }
};

export const addTask = async (req, res) => {
  try {
    const { title, description, startDate, dueDate, status, priority } =
      req.body;
    const addTask = await Task.create({
      title,
      description,
      startDate,
      dueDate,
      status,
      priority,
      assignedTo: req.user,
    });
    if (addTask) {
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessage.TASK_ADDED,
        data: addTask,
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      data: error.message,
    });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const findAllTask = await Task.find({ assignedTo: req.user });
    if (findAllTask) {
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ResponseMessage.TASK_LIST_GET,
        data: findAllTask,
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      data: error.message,
    });
  }
};
