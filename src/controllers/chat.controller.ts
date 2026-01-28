
import { Request, Response } from "express";
import { AppDataSource } from "../utils/db";
import { Chat } from "../entities/Chat";
import { firestore } from "../utils/firebase";
import { v4 as uuid } from "uuid";

export const createChat = async (req: Request, res: Response) => {
  const { userAId, userBId } = req.body;
  const repo = AppDataSource.getRepository(Chat);

  let chat = await repo.findOne({ where: { userAId, userBId } });
  if (!chat) {
    chat = repo.create({ userAId, userBId });
    await repo.save(chat);
  }
  res.json({ chatId: chat.id });
};

export const sendMessage = async (req: Request, res: Response) => {
  const { senderId, text } = req.body;
  const { chatId } = req.params;

  const messageId = uuid();
  await firestore.collection("messages").doc(messageId).set({
    chatId,
    senderId,
    text,
    timestamp: Date.now(),
    readBy: []
  });

  res.json({ messageId });
};

export const getMessages = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const limit = Number(req.query.limit) || 50;

  const snap = await firestore
    .collection("messages")
    .where("chatId", "==", chatId)
    .orderBy("timestamp", "desc")
    .limit(limit)
    .get();

  res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
};

export const markRead = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { messageId } = req.params;

  await firestore.collection("messages").doc(messageId).update({
    readBy: firestore.FieldValue.arrayUnion(userId)
  });

  res.json({ success: true });
};

export const updateLastSeen = async (req: Request, res: Response) => {
  const { userId, messageId } = req.body;
  const { chatId } = req.params;

  await firestore.collection("lastSeen").doc(`${chatId}_${userId}`).set({
    chatId,
    userId,
    messageId,
    updatedAt: Date.now()
  });

  res.json({ success: true });
};
