import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const getGroupDetailAction = async (id, setGroupDetail) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        await axios({
            method: 'get',
            url: `${URL}/channels/${id}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log(res.data.data)
                setGroupDetail(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    } catch (error) {
        return error.data
    }
}