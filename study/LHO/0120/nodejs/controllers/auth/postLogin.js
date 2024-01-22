const User = require('./../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const postLogin = async (req, res) => {
    try {
        const { password, mail } = req.body

        // user 오브젝트를 받아오는 과정
        const user = await User.findOne({ mail : mail.toLowerCase() })

        // 입력받은 user의 password와 저장되어 있는 user 의 비밀번호가 같다면
        if (user && (await bcrypt.compare(password, user.password))){
            // send new token
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
            return res.status(200).json({
                userDetails : {
                    mail : user.mail,
                    token : token,
                    username : user.username,
                },
            })
        }

        return res.state(400).send('invaild credentials')

    } catch (err) {
        return res.status(500).send('something went wrong')
    }
}

module.exports = postLogin;