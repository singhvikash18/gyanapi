const categorycontroller = require('../service/course_category_services')
const catchAsync = require('./../utils/catch_async');


const httpStatus = require('http-status');

const courseCategoryControl = catchAsync(async(req,res)=>{
    const cat = await categorycontroller.course_Category();
    const response = cat;
    const data ={
        itemcount : 2,
        status_code : httpStatus.OK,
        message: "successfully sent",
        data: response,

    };
    res.status(httpStatus.OK).send(data)
});

const courseCategoryIdControl = catchAsync(async(req,res)=>{
    const cat = await categorycontroller.course_cat_idService(req.params._id)
    const response = cat;
    const data ={
        itemcount : 2,
        status_code : httpStatus.OK,
        message: "successfully sent",
        data: response,

    };
    res.status(httpStatus.OK).send(data)
});

const category_read ={
    courseCategoryControl,
    courseCategoryIdControl,
}

module.exports = category_read;