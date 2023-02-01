import express from "express";
import handlePrompt from "../controllers/promptController.js";

const router = express.Router();

router.get("/savedPrompts", handlePrompt.savedPrompts);
router.post("/savePrompt", handlePrompt.savePrompt);
router.post("/deleteAll", handlePrompt.deleteAll);

export default router;