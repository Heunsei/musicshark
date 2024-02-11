import axios from 'axios'
import { getCookie } from '../../../../util/cookie'

/**그룹의 특정 영상을 삭제할 action
 * @param {int} channelId 채널 아이디
 * @param {int} videoId 비디오 아이디
 */
export const deleteGroupRecordListAction = async (channelId, videoId) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const res = await axios({
            method: 'delete',
            url: `${URL}/videos/channels/${channelId}?video_idx=${videoId}`,
            data: { channel_id: channelId },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.lot(res.data)
    } catch (err) {
        console.log(err)
    }
}