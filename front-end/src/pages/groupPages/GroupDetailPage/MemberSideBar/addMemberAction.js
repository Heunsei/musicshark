import axios from 'axios'
import { getCookie } from '../../../../util/cookie'

export const addMemberAction = (channelIdx, inviteUser) => {
    console.log('from action', inviteUser, channelIdx)
    const accessToken = getCookie('accessToken')
    try {
        const resopnse = axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/channels/${channelIdx}/members/${inviteUser}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('나한테 왜이럼?',resopnse)
    } catch (err) {
        console.log(err)
    }
}
