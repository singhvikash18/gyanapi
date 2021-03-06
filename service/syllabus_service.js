const router = require('express').Router();
const mongoose =require('mongoose')
const syllabus = require('../model/syllabus_table');

const syllabusService = async(courseId)=>{
    const ns = await syllabus.find({course_id:courseId});
    return ns;
}

const syllabusIdService = async(syllabusId)=>{
    const ns = await syllabus.findOne({_id:syllabusId});
    return ns;
}

const syllabusCategoryservice = async(categoryId)=>{
    const ObjectId = mongoose.Types.ObjectId;
    const ps = await syllabus.aggregate(
        
        [   
           
            
            { 
                
                 $match : { category_id: ObjectId(categoryId)}
                 },
        //    {
        //     $unwind: "$category_id"
        //    },
            {
                $lookup :
                {
                    from: "courses",
                    localField : "course_id",
                    foreignField : "_id",
                    as : "course"
                }
               
            }
            
        ]
    )
        
    return ps;
}

module.exports = {syllabusService,syllabusIdService,syllabusCategoryservice,}