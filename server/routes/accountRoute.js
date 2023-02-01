import express from "express";
import account from "../controllers/accountController.js";

const router = express.Router();

router.post("/login", account.login);
router.post('/signup', account.signup);

export default router;