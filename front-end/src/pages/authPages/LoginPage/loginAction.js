import axios from 'axios'
import { setCookie, getCookie } from './../../../util/cookie';
import { setLogin } from '../../../redux/store/loginSlice';


export const loginAction = async (userDetails, dispatch) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/auth/sign-in',
            data: userDetails
        })

        console.log(response.data)
        const ACCESS_TOKEN = response.data.accessToken
        const REFRESH_TOKEN = response.data.refreshToken

        if (ACCESS_TOKEN) {
            setCookie('Authorization', ACCESS_TOKEN, {
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
        if (ACCESS_TOKEN && REFRESH_TOKEN){
            const isLogin = true
            dispatch(setLogin(isLogin))
        }
    } catch (err) {
        console.log(err)
        return {
            error: true,
            err
        }
    }
}