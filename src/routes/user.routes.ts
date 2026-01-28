
import { Router } from "express";
import { listUserChats } from "../controllers/user.controller";

const router = Router();
router.get("/:userId/chats", listUserChats);

export default router;
