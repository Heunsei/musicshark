import axios from 'axios'
import { getCookie } from '../../../../util/cookie'

export const createGroupAction = async (groupDetail) => {
    console.log(groupDetail)
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'post',
            url: `${URL}/channels`,
            data: groupDetail,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data.data.channelIdx

    } catch (err) {
        console.log(err)
        return {
            error: true,
            err
        }
    }
}