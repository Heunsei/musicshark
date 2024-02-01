import axios from 'axios'
import { setCookie, getCookie } from './../../../util/cookie';
import { setLogin } from '../../../redux/store/loginSlice';
import * as setUser from './../../../redux/store/userSlice'

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
            const isLogin = true
            dispatch(setLogin(isLogin))
            axios({
                method: 'get',
                url: 'http://localhost:8080/user/',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                }
            })
                .then((res) => {
                    dispatch(setUser.setEmail(res.data.userEmail))
                    dispatch(setUser.setNickname(res.data.nickname))
                    dispatch(setUser.setGender(res.data.gender))
                    dispatch(setUser.setBrith(res.data.birth))
                    navigate('/group')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    } catch (err) {
        console.log(err)
        return {
            error: true,
            err
        }
    }
}