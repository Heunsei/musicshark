import axios from 'axios'
import { getCookie } from '../../../../util/cookie'

export const editGroupAction = async (editInfo) => {
    console.log(editInfo)
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'patch',
            url: `${URL}/channels/${editInfo.channelId}`,
            data: editInfo,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(response)
    } catch (err) {
        console.log(err)
        return {
            error: true,
            err
        }
    }
}