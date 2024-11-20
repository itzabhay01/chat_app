import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utilty.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

//Create  a new user in database and save it to the database and save token in the cookie
const newUser= TryCatch(async(req,res,next)=>{
    const {name,username,password}= req.body;
    const file = req.file;

    if(!file) return next(new ErrorHandler("Please upload avatar",400))


    const avatar={
        public_id:"sdffawf",
        url:"asfdkjans",
    }

    const user = await User.create({name, username, password, avatar});

    sendToken(res,user, 201, "User Created");
})

//login user and save token in the cookie
const login= TryCatch(async(req,res, next)=>{
    const {username , password}= req.body;

    const user= await User.findOne({username}).select("+password");

    if(!user) return next( new ErrorHandler("Invalid Username or Password",404))

    const isMatch = await compare(password,user.password);

    if(!isMatch) return next(new ErrorHandler("Invalid Username or Password",404))

    sendToken(res,user,200,`Welcome back, ${user.name}`);
})

const getMyProfile = TryCatch(async(req, res,next)=>{

    const user = await User.findById(req.user);


    res.status(200).json({
        success:true,
        user,
    })

})
const logout = TryCatch(async(req, res)=>{

    return res.status(200).cookie("chat-token", "", {...cookieOptions, maxAge: 0}).json({
        success:true,
        message:"Logged out successfully"
    })

})

const searchUser = TryCatch(async(req, res)=>{
    const {name} = req.query;
    //finding all my chats
    const myChats = await Chat.find({ groupChat: false, members: req.user});
    //finding all the users from my chat
    const allUsersFromMyChats = myChats.map((chat)=> chat.members).flat();


    //finding those users which are not in my chat
    const allUsersExceptMeAndFriends = await User.find({
        _id: {$nin : allUsersFromMyChats},
        name:{$regex: name, $options: "i"},
    })
    //modifying the users
    const users = allUsersExceptMeAndFriends.map(({_id,name,avatar})=>({
        _id,
        name,
        avatar: avatar.url
    }))

    return res.status(200).json({
        success: true,
        message: users,
    })

})

const sendFriendRequest = TryCatch(async (req, res, next) => {
    const { userId } = req.body;
  
    const request = await Request.findOne({
      $or: [
        { sender: req.user, receiver: userId },
        { sender: userId, receiver: req.user },
      ],
    });
  
    if (request) return next(new ErrorHandler("Request already sent", 400));
  
    await Request.create({
      sender: req.user,
      receiver: userId,
    });
  
    emitEvent(req, NEW_REQUEST, [userId]);
  
    return res.status(200).json({
      success: true,
      message: "Friend Request Sent",
    });
  });

const acceptFriendRequest = TryCatch(async(req, res,next)=>{

    const {requestId, accept} = req.body;

    const request = await Request.findById(requestId).populate("sender","name").populate("receiver","name");

    if(!request) return next(new ErrorHandler("Request not found",404));

    if(request.receiver._id.toString() !== req.user.toString) return next(new ErrorHandler("You are not authorized to accept this request",401));

    if(!accept){
        await request.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Request deleted successfully",
        })
    }

    const members =[request.sender._id, request.receiver._id ]

    await Promise.all([
        Chat.create({
            members,
            name: `${request.sender.name}-${request.receiver.name}`,
        }),
        request.deleteOne()
    ])

    emitEvent(req,REFETCH_CHATS,members)

    return res.status(200).json({
        success: true,
        message: "Frien request accepted",
        senderId: request.sender._id,
    })



});

const getAllNotifications = TryCatch(async(req,res)=>{
    const requests = await Request.find({ receiver: req.user}).populate("sender","name avatar");

    const allRequests = requests.map(({_id,sender})=>({
        _id,
        sender:{
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
        }
    }))

    return res.status(200).json({
        success: true,
        requests: allRequests,
    })

})

const getMyFriends = TryCatch(async (req, res) => {
    const chatId = req.query.chatId;
  
    const chats = await Chat.find({
      members: req.user,
      groupChat: false,
    }).populate("members", "name avatar");
  
    const friends = chats.map(({ members }) => {
      const otherUser = getOtherMember(members, req.user);
  
      return {
        _id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar.url,
      };
    });
  
    if (chatId) {
      const chat = await Chat.findById(chatId);
  
      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      );
  
      return res.status(200).json({
        success: true,
        friends: availableFriends,
      });
    } else {
      return res.status(200).json({
        success: true,
        friends,
      });
    }
  });
  




export { login, newUser, getMyProfile, logout,searchUser,sendFriendRequest, acceptFriendRequest,getAllNotifications, getMyFriends};