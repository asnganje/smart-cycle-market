import { Router } from "express";
import { getOrCreateConversation } from "src/controllers/conversation";
import { isAuth } from "src/middleware/auth";


const conversationRouter = Router()

  conversationRouter.route("/with/:peerId").get(isAuth, getOrCreateConversation)

export default conversationRouter