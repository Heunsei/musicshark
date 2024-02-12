import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const uploadGroupVideoAction = async (formData, channel_id) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'post',
            url: `${URL}/videos/channels/${channel_id}`,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`
            },
            data: formData
        })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}