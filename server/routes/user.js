import express from "express";
import { getAllNotifications, getMyFriends, getMyProfile, login, logout, newUser, searchUser, sendFriendRequest } from "../controllers/user.js";
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandeler } from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/Auth.js";
import { singleAvatar } from "../middlewares/multer.js";

const router = express.Router();

router
    .post("/new", singleAvatar,registerValidator(),validateHandeler,newUser)
    .post("/login",loginValidator(),validateHandeler,login)

    //After herer user must be logged in to access the routes
    .use(isAuthenticated)

    .get("/me", getMyProfile)
    .get("/logout",logout)
    .get("/search",searchUser)
    .put("/sendrequest",sendRequestValidator(),validateHandeler,sendFriendRequest)
    .put("/acceptrequest",acceptRequestValidator(),validateHandeler,sendFriendRequest)
    .get("/notifications",getAllNotifications)
    .get("/friends",getMyFriends)


export default router;