import axios from 'axios'
import { getCookie } from '../../../util/cookie'

/**
 * 
 * @param {int} id channelId 
 * @param {*} formData video form data
 */
export const uploadGroupRecordAction = async (channel_id, formData) => {
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
        console.log('그룹 연습 영상 저장 : ', response)
    } catch (err) {
        console.log(err)
    }
}