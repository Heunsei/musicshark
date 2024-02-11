import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const searchGroupRecord = async (channel_id, videoTitle) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'post',
            url: `${URL}/videos/channels/${channel_id}/search?videoTitle=${videoTitle}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: { channel_id: channel_id }
        })
        console.log(response)
        return response.data
    } catch (err) {
        console.log(err)
    }
}