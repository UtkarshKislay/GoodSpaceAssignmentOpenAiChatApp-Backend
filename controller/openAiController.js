const OpenAI = require("openai");
const messageModel = require("../modal/Message");
class OpenAiChat {

  static initializeChatResponseWithUser = async (req, res) => {
    try {
      const { email } = req.body;
      const prevChat = await messageModel.find({
        $or: [{ email: email, senderAdd: "User" }, { email: email, senderAdd: "openAi" }]
      }).sort({createdAt:1});
      console.log(prevChat);
      return res.status(200).json({ message: "Initialize Chat", data: prevChat });

    } catch (err) {
      return res.status(500).json({ error: "An error occurred" });
    }

  }



  static chatResponse = async (req, res) => {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
      const { email, message } = req.body;
      console.log(email);
      const messageModelStruct = {
        email: email,
        senderAdd: "User",
        message: message,
        createdAt: new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'})
      }
      await messageModel(messageModelStruct).save();
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
      });
      const messageRecieved = chatCompletion.choices[0].message["content"];
      const messageModelStructByOpenAi = {
        email: email,
        senderAdd: "openAi",
        message: messageRecieved,
        createdAt: new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'})
      }
      await messageModel(messageModelStructByOpenAi).save();
      return res.status(200).json({ message: "Query execute Successfully", data: messageRecieved });
    } catch (error) {

      return res.status(500).json({ error: "An error occurred" });
    }
  }
}

module.exports = OpenAiChat;

