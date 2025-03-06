import { Router } from "express";
import { getUserProfile, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticatted.js";
import { createTasks, deleteTaskById, getCreatedTask, updateTaskCompletion } from "../controllers/task.controller.js";

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated,getUserProfile)
router.route("/tasks").post(isAuthenticated,createTasks)
router.route("/tasks/user").get(isAuthenticated,getCreatedTask)
router.route("/tasks/:taskId").patch(isAuthenticated,updateTaskCompletion)
router.route("/tasks/:taskId").delete(isAuthenticated,deleteTaskById)
export default router