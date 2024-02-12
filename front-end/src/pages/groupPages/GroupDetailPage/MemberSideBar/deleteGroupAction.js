import axios from 'axios'
import { getCookie } from '../../../../util/cookie'

export const deleteGroupAction = async (channelIdx) => {
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}/channels/delete/${channelIdx}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(response)
        return response
    } catch (err) {
        console.log(err)
    }
}
