import express from "express";
const userRoutes = express.Router();
import * as user from "../controller/user/UserController.js";
import { UserAuth } from "../middleware/Auth.js";
//region user routes
userRoutes.post("/registration", user.addUser);
userRoutes.post("/login", user.userLogin);
userRoutes.post("/add-task", UserAuth, user.addTask);
userRoutes.get("/get-all-task", UserAuth, user.getAllTask);
export default userRoutes;
