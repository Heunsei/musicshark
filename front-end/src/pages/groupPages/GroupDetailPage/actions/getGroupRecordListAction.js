import axios from 'axios'
import { getCookie } from '../../../util/cookie'


/** 그룹의 영상 목록들을 가져올 action
* @param {int} id 채널 아이디
* @return 그룹의 영상 목록 배열
*/
export const getGroupRecordListAction = async (channelId) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const res = await axios({
            method: 'get',
            url: `${URL}/videos/channels/${channelId}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('그룹 record 목록 조회 : ', res)
        return res.data
    } catch (err) {
        console.log(err)
    }
}