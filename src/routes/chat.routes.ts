
import { Router } from "express";
import * as controller from "../controllers/chat.controller";

const router = Router();

router.post("/create", controller.createChat);
router.post("/:chatId/message/send", controller.sendMessage);
router.get("/:chatId/messages", controller.getMessages);
router.post("/:chatId/message/:messageId/read", controller.markRead);
router.post("/:chatId/lastseen", controller.updateLastSeen);

export default router;
