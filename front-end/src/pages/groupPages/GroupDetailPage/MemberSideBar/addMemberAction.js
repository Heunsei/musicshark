import axios from 'axios'

export const addMemberAction = (channelIdx, inviteUser) => {
    console.log('from action', inviteUser, channelIdx)
    try {
        const resopnse = axios ({
            method : 'post',
            url : `${process.env.REACT_APP_API_URL}/channels/${channelIdx}/members/${inviteUser}`
        })
    } catch (err) {
        console.log(err)
    }
}
