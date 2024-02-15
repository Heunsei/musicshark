import axios from 'axios'
import { setCookie, getCookie } from './../../../util/cookie';
import getUserAction from './getUserAction';


export const loginAction = async (userDetails, dispatch, navigate) => {
    console.log(JSON.stringify(userDetails))
    const URL = process.env.REACT_APP_API_URL
    try {
        const response = await axios({
            method: 'post',
            url: `${URL}/auth/sign-in`,
            data: userDetails,
        })

        console.log(response)
        const ACCESS_TOKEN = response.data.accessToken
        const REFRESH_TOKEN = response.data.refreshToken

        if (ACCESS_TOKEN) {
            setCookie('accessToken', ACCESS_TOKEN, {
                path: '/',
                secure: true,
                sameSite: 'none',
            });
        }
        if (REFRESH_TOKEN) {
            setCookie('refreshToken', REFRESH_TOKEN, {
                path: '/',
                secure: true,
                sameSite: 'none',
            });
        }
        if (ACCESS_TOKEN && REFRESH_TOKEN) {
            getUserAction(ACCESS_TOKEN, dispatch, navigate)
        }
    } catch (err) {
        console.log(err)
        alert('가입되어 있지 않는 이메일이거나 올바르지 않는 비밀번호입니다.')  
        return {
            error: true,
            err
        }
    }
}