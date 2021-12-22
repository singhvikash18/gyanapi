const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    student_id:{
        type:String,
        required:true,
        unique:true
    },
    student_firstname:{
        type:String,
        required:true,
        
    },
    student_lastname:{
        type:String,
        required:true
    },
    student_class:{
        type:String,
        required:true
    },
    student_address:{
        type:String,
        required:true
    },
    student_city:{
        type:String,
        required:true
    },
    student_state:{
        type:String,
        required:true
    },
    student_country:{
        type:String,
        required:true
    },
    student_age:{
        type:String,
        required:true
    },
    student_gender:{
        type:String,
        required:true
    },
    student_mobile:{
        type:String,
        required:true
    },
    student_sociallinks:{
        type:String,
        required:true
    },
    student_paid:{
        type:String,
        required:true
    },
    created_at:{
        type:String,
        required:true
    },
    updated_at:{
        type:String,
        required:true
    }
    
})
module.exports=mongoose.model('student',studentSchema);