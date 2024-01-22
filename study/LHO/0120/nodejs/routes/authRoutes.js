const express = require('express')
const router = express.Router();
const authControllers = require('./../controllers/auth/authControllers')
// 요청 유효성 검사를 위한 패키지 import
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({});
const auth = require('./../middleware/auth')


const registerSchema = Joi.object({
    username : Joi.string().min(3).max(12).required(),
    password : Joi.string().min(6).max(12).required(),
    mail : Joi.string().email().required(),
})

const loginSchema = Joi.object({
    password : Joi.string().min(6).max(12).required(),
    mail : Joi.string().email().required(), 
})

router.post('/register',validator.body(registerSchema) ,authControllers.controllers.postRegister)
router.post('/login',validator.body(loginSchema) ,authControllers.controllers.postLogin)
router.get("/test", auth, (req, res) => {
    res.send("request passed")
})
// middleware work test
module.exports = router