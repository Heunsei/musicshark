import axios from 'axios'
import { getCookie } from '../../../../util/cookie'

export const addMemberAction = async (channelIdx, inviteUser) => {
    console.log('from action', inviteUser, channelIdx)
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/channels/${channelIdx}/members/${inviteUser}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('나한테 왜이럼?', response)
    } catch (err) {
        console.log(err)
    }
}
