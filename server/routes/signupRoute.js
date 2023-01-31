import express from 'express';
import signup from '../controllers/signup.controller.js';

const router = express.Router();

router.post('/', signup);

export default router;