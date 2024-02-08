import axios from 'axios'
import { loginAction } from '../LoginPage/loginAction'

export const registerAction = async (props) => {
    const URL = process.env.REACT_APP_API_URL
    console.log(props)
    try {
        const response = await axios({
            method: 'post',
            url: `${URL}/auth/sign-up`,
            data: props
        })
        console.log(response)
        if (response.data.status === 500 && (response.data.message === "존재하는 닉네임입니다." || response.data.message === '존재하는 이메일입니다.')) {
            alert(`${response.data.message}`)
            return false
        }

        if (response.data.status === 200 && response.data.message === "회원가입 성공") {
            return true
        }
    } catch (err) {
        alert(err)
        return {
            error: true,
            err
        }
    }
}
