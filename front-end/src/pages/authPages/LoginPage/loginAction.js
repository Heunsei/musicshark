import axios from 'axios'
import { setCookie, getCookie } from './../../../util/cookie';

export const loginAction = async (userDetails) => {
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
    } catch (err) {
        console.log(err)
        return {
            error: true,
            err
        }
    }
}