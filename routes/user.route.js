import express from "express";
import { userRegister, userLogin } from "../controller/user.controller.js";
const router = express.Router();

router.post("/create", userRegister);
router.post("/login", userLogin);

export default router;
