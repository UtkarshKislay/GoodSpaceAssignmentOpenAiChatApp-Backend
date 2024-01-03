const express=require('express');
const router=express.Router();



const openAiChat =require('../controller/openAiController');

router.post('/openai/initializeChatResponse',openAiChat.initializeChatResponseWithUser);
router.post('/openai/chat',openAiChat.chatResponse);

module.exports=router;


