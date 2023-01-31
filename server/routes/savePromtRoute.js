import express from "express";
import savePrompt from "../controllers/savePrompt.controller.js";

const router = express.Router();

router.post("/", savePrompt);

export default router;