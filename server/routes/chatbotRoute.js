import express from 'express';
const router = express.Router();
import ChatbotController from "../controllers/chatbotController.js";

router.post("/", async (req, res) => {
    try {
      const model = req.body.model;
      const prompt = req.body.prompt;
      const temperature = parseFloat(req.body.temperature);
      console.log(temperature);
      const botResponse = await ChatbotController.generateResponse(model, prompt, temperature);
      res.status(200).send({ bot: botResponse });
    } catch (error) {
      console.log(error);
      res.status(500).send(error || "Something went wrong");
    }
});
export default router;