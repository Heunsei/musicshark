import axios from 'axios'
import { getCookie } from '../../../../util/cookie'

export const deleteGroupMemberAction = async (channelIdx) => {
    const accessToken = getCookie('accessToken')
    console.log('이거 삭제하고있냐?', channelIdx)
    console.log(accessToken)
    try {
        const response = await axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}/channels/${channelIdx}/members`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(response)
        if (response.data.message === "방장은 탈퇴할 수 없습니다.") {
            alert('방장은 탈퇴할 수 없습니다')
        }
    } catch (err) {
        console.log(err)
    }
}
