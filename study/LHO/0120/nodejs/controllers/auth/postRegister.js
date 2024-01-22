const User = require('./../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// 요청을 나눠서 관리
const postRegister = async (req, res) => {
    try {
        const { username, mail, password } = req.body;
        // 유저가 존재하는지 확인
        const userExists = await User.exists({ mail : mail.toLowerCase()});

        if (userExists) {
            return res.status(409).send('E-mail already in use')
        }

        // encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // 유저 생성 및 저장
        const user = await User.create({
            username,
            mail : mail.toLowerCase(),
            password : encryptedPassword,
        })

        // create JWT Token
        // mogo에서 id가 _id로 저장되어서 그럼
        const token = jwt.sign(
            {
                userId : user._id,
                mail
            },
            process.env.TOKEN_KEY,
            {
                expiresIn : '24h',
            }
        )

        res.status(201).json({
            userDetails : {
                mail : user.mail,
                token : token,
                username : user.username,
            }
        })
    } catch (err) {
        return res.status(500).send('Error Occured.')
    }
}

module.exports = postRegister;