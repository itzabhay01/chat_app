import express from "express";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from "../controllers/chat.js";
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentValidator, validateHandeler } from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/Auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const router = express.Router();

router

    .use(isAuthenticated)
    .post("/new",newGroupValidator(),validateHandeler, newGroupChat)
    .get("/my", getMyChats)
    .get("/my/groups", getMyGroups)
    .put("/addmembers",addMemberValidator(),validateHandeler, addMembers)
    .put("/removemember",removeMemberValidator(),validateHandeler, removeMembers)
    .delete("/leave/:id",chatIdValidator(),validateHandeler,leaveGroup)

    //send attachments
    .post("/message",attachmentsMulter,sendAttachmentValidator(),validateHandeler ,sendAttachments)


    //get messages
    .get("/message/:id",chatIdValidator(),validateHandeler, getMessages)


    // get chat details, rename, delete
    .route("/:id")
    .get(chatIdValidator(),validateHandeler,getChatDetails)
    .put(renameValidator(),validateHandeler,renameGroup)
    .delete(chatIdValidator(),validateHandeler,deleteChat);

export default router;