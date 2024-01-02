const OpenAI = require("openai");
class OpenAiChat {
  static chatResponse = async (req, res) => {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
      const { message } = req.body;
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
      });
      console.log(chatCompletion.choices[0].message["content"]);
      return chatCompletion.choices[0].message["content"];
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }
}

module.exports = OpenAiChat;
