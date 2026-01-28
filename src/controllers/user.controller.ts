
import { Request, Response } from "express";
import { AppDataSource } from "../utils/db";
import { Chat } from "../entities/Chat";

export const listUserChats = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const repo = AppDataSource.getRepository(Chat);

  const chats = await repo.find({
    where: [{ userAId: userId }, { userBId: userId }]
  });

  res.json(chats);
};
