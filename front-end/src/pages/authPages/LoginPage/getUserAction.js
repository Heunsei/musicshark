import axios from 'axios'
import * as setUser from './../../../redux/store/userSlice'
import { setLogin } from '../../../redux/store/loginSlice';

const getUserAction = async (ACCESS_TOKEN, dispatch, navigate) => {
    const URL = process.env.REACT_APP_API_URL
    try {
        const isLogin = true
        dispatch(setLogin(isLogin))
        axios({
            method: 'get',
            url: `${URL}/user/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            }
        })
            .then((res) => {
                console.log('setUser 상태', res.data)
                dispatch(setUser.setEmail(res.data.userEmail))
                dispatch(setUser.setNickname(res.data.nickname))
                dispatch(setUser.setGender(res.data.gender))
                dispatch(setUser.setBrith(res.data.birth))
                dispatch(setUser.setUserIdx(res.data.userIdx))
                navigate('/group')
            })
            .catch((err) => {
                console.log(err)
            })
    } catch (err) {
        console.log(err)
    }
}

export default getUserAction