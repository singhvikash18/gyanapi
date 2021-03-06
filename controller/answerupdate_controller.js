const answerService = require('../service/answerupdate_services');

const catchAsync = require('./../utils/catch_async');
const httpStatus = require('http-status');

const answerController = catchAsync(async(req,res)=>{
    const dmo = await answerService.answer(req.body.userid,req.body.mcqsid);
    const response = dmo;
    const data ={
        itemcount : 2,
        status_code : httpStatus.OK,
        message: "successfully sent",
        data: response,

    };
    res.status(httpStatus.OK).send(data)
});

//route in mcq
const answerUpdateController = catchAsync(async(req,res)=>{
    const dmo = await answerService.answerupdate(req.body);
    
    const response = dmo;
    const data ={
        itemcount : 2,
        status_code : httpStatus.OK,
        message: "successfully answer updated",
        data: response,

    };
    res.status(httpStatus.OK).send(data)
});
const ansRead ={answerController,answerUpdateController,}

module.exports = ansRead;