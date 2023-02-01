import express from 'express';
const router = express.Router();
import chatbot from "../controllers/chatbotController.js";

router.post("/", chatbot);
export default router;