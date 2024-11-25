const errorMiddleware=(err, req, res, next)=>{
    err.message||="Internal Sever error";
    err.statusCode||=500;

    if(err.code === 11000){
        const error = Object.keys(err.keyPattern).join(",")
        err.message = `Duplicate Field - ${error}`;
        err.statusCode = 400
    }

    if(err.name === "CastError"){
        const errorPath = err.path
        err.message = `Invalid format of ${errorPath}`
        err.statusCode =400
    }

    return res.status(err.statusCode).json({
        success:false,
        message: process.env.NODE_ENV ==="DEVELOPMENT"? err: err.message,
    });



};

const TryCatch =(passedFunc)=> async(req,res,next)=>{
    try {
        await passedFunc(req,res,next);
    } catch (error) {
        next(error);
    }
};

export {errorMiddleware, TryCatch};