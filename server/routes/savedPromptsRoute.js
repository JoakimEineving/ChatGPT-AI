import express from "express";
import savedPrompts from "../controllers/savedPrompts.controller.js";

const router = express.Router();

router.post("/", savedPrompts);

export default router;