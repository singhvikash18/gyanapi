const typeControl = require('../service/course_type_services')
const catchAsync = require('./../utils/catch_async');



const httpStatus = require('http-status');

const coursetypeController = catchAsync(async(req,res)=>{
    const typ = await typeControl.typeService();
    const response = typ;
    const data ={
        itemcount : 2,
        status_code : httpStatus.OK,
        message: "successfully sent",
        data: response,

    };
    res.status(httpStatus.OK).send(data)
});
const type_read ={
    coursetypeController,
}

module.exports = type_read;

