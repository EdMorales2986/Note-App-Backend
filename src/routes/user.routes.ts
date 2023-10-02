import { Request, Response, Router } from "express";
import { deleteUser, updateInfo } from "../controllers/users.controllers";

const router = Router();

router.post("/delete", deleteUser);
router.post("/update", updateInfo);

export default router;
