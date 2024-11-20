import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utilty.js";

const validateHandeler = (req,res,next) =>{
    const errors = validationResult(req);

    const errorMessages = errors.array().map((error)=> error.msg).join(",");


    console.log(errorMessages);
    if(errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessages,400))

}

const  registerValidator = () => [
    body("name","Please enter name").notEmpty(),
    body("username","Please enter username").notEmpty(),
    body("bio","Please enter bio").notEmpty(),
    body("password","Please enter password").notEmpty() 
];

const  loginValidator = () => [
    body("username","Please enter username").notEmpty(),
    body("password","Please enter password").notEmpty()  
];

const  newGroupValidator = () => [
    body("name","Please enter name").notEmpty(),
    body("members")
    .notEmpty()
    .withMessage("Please enter members")
    .isArray({min: 2, max:100})
    .withMessage("Members must be 2-100")
];

const  addMemberValidator = () => [
    body("chatId","Please enter Chat ID").notEmpty(),
    body("members")
    .notEmpty()
    .withMessage("Please enter members")
    .isArray({min: 1, max:97})
    .withMessage("Members must be 1-97")
];

const  removeMemberValidator = () => [
    body("chatId","Please enter Chat ID").notEmpty(),
    body("userId","Please enter User ID").notEmpty(),

];
const  sendAttachmentValidator = () => [
    body("chatId","Please enter Chat ID").notEmpty(),

];

const  chatIdValidator = () => [
    param("id","Please enter Chat ID").notEmpty(),
];

const  renameValidator = () => [
    param("id","Please enter Chat ID").notEmpty(),
    body("name","Please enter New Name").notEmpty(),
];

const  sendRequestValidator = () => [
    body("userId","Please enter User ID").notEmpty(),
];

const  acceptRequestValidator = () => [
    body("requestId","Please enter Request ID").notEmpty(),
    body("accept")
    .notEmpty()
    .withMessage("Please add accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];

const  adminLoginValidator = () => [
    body("secretKey","Please enter Secret Key").notEmpty()
];




export { acceptRequestValidator, addMemberValidator, adminLoginValidator, chatIdValidator, loginValidator, newGroupValidator, registerValidator, removeMemberValidator, renameValidator, sendAttachmentValidator, sendRequestValidator, validateHandeler };
