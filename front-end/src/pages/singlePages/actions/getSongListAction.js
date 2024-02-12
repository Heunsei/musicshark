import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const getSongListAction = async () => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'get',
            url: `${URL}/perfectplay/list`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response
    } catch (err) {
        console.log(err)
    }
}