const OpenAI = require("openai");
const messageModel=require("../modal/Message");
class OpenAiChat {
  static chatResponse = async (req, res) => {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
      const {email, message } = req.body;
      console.log(email);
      const messageModelStruct={
        email:email,
        senderAdd:"User",
        message:message,
        createdAt:new Date()
      }
      await messageModel(messageModelStruct).save();
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-3.5-turbo",
      });
      const messageRecieved=chatCompletion.choices[0].message["content"];
      const messageModelStructByOpenAi={
        email:email,
        senderAdd:"openAi",
        message:messageRecieved,
        createdAt:new Date()
      }
      await messageModel(messageModelStructByOpenAi).save();
      return res.status(200).json({message:"Query execute Successfully",data:messageRecieved});
    } catch (error) {
 
      return res.status(500).json({ error: "An error occurred" });
    }
  }
}

module.exports = OpenAiChat;

