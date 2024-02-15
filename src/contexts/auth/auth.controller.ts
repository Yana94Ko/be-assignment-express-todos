import { Router } from "express";
import authService from "./auth.service";

const authController = Router();

authController.post("/sign-up", authService.signUp);
authController.post("/log-in", authService.logIn);
authController.post("/log-out", authService.logOut);
authController.post("/refresh-token", authService.refreshAccessToken);
authController.get("/", authService.getUsers);
authController.get("/:userId", authService.getUser);
authController.put("/:userId", authService.updateUser);
authController.delete("/:userId", authService.deleteUser);

export default authController;
