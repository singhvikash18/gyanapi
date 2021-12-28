const loginservices = require('../service/login.services')
const tokenservice =require('./token.services');

const User = require('../model/user_models');
const httpStatus =require('http-status');

const userservices = require('../service/user_services');

const bcrypt = require('bcryptjs');

const moment = require('moment')
const AppError = require('../utils/app_error');




const checkPassword =  async (password, correctPassword) => {
    const isPasswordMatch = await bcrypt.compare(password, correctPassword);
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Passwords do not match");
      }

}

const userlogin = async (email, password,roles) => {

    
        const user = await loginservices.getUserbyEmail(email,roles);
        console.log(user);
        await checkPassword(password, user.password);
        return user;
    

}

// const updatePassword = async(password)=>{
//   const pass = await userservices.signup(password);
//   await checkPassword(password, pass.password);
//   return pass;
// } 

const generateAuthTokens = async (userID)=>{
    const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, "minutes");
    console.log(accessTokenExpires); console.log(process.env.JWT_ACCESS_EXPIRATION_MINUTES)
    const accessToken = tokenservice.generateToken(userID, accessTokenExpires)
    const refreshTokenExpires = moment().add(process.env.JWT_REFRESH_EXPIRATION_DAYS, "minutes");
    const refreshToken = tokenservice.generateToken(userID, refreshTokenExpires)

    await tokenservice.saveToken(
        refreshToken,
        userID,
        refreshTokenExpires,
        "refresh"
    );
    return {
        access:{
            token:accessToken,
            expires:accessTokenExpires.toDate(),
        },
        refresh:{
            token:refreshToken,
            expires:refreshTokenExpires.toDate(),
        }
    }
}

const generateResetPasswordToken = async (email) => {
    
    let user = await User.findOne({ email:email });
    console.log(user);
    if (!user) {
        throw new AppError(httpStatus.BAD_REQUEST, "email do not match");
      }
    

    
    const expires = moment().add(
      process.env.JWT_EXPIRES_IN,
      "minutes"
    );
    console.log(expires);
    const resetPasswordToken = tokenservice.generateToken(user._id, expires);
    await tokenservice.saveToken(
      resetPasswordToken,
      user._id,
      expires,
      "resetPassword"
    );
    
    return resetPasswordToken;
  };





module.exports =  {
    userlogin,
    generateAuthTokens,
    generateResetPasswordToken,
    // updatePassword,
}