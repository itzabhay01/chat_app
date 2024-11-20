import express from "express";
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboardStats } from "../controllers/admin.js";
import { adminLoginValidator, validateHandeler } from "../lib/validators.js";
import { isAdmin } from "../middlewares/Auth.js";

const router = express.Router();

router

    .post("/verify",adminLoginValidator(),validateHandeler,adminLogin)

    .get("/logout",adminLogout)

    //only admin can access these routes
    .use(isAdmin)
    .get('/',getAdminData)

    .get("/users",allUsers)
    .get("/chats",allChats)
    .get("/messages",allMessages)

    .get("/stats",getDashboardStats)


export default router;