import axios from 'axios'
import { getCookie } from '../../../util/cookie'
import { logoutAction } from '../../authPages/LoginPage/logoutAction'


const loadGroupAction = async (setGroupList, navigate, dispatch) => {
    const accessToken = getCookie('accessToken')
    const URL = process.env.REACT_APP_API_URL
    try {
        return await axios({
            method: 'get',
            url: `${URL}/channels`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                if (res.data.message === "채널 리스트 조회 에러") {
                    logoutAction(navigate, dispatch)
                    navigate('/login')
                }
                console.log(res)
                setGroupList(res.data.data)
                return res.data.data
            })
            .catch((err) => {
                console.log(err)
            })
    } catch (err) {
        console.log(err)
    }
}

export default loadGroupAction