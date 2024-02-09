import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const getSingleRecordListAction = async (videoIdx) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'delete',
            url: `${URL}/videos/personal?video_idx=${videoIdx}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('노래 데이터 삭제 결과 : ', response.data)
    } catch (err) {
        console.log(err)
    }
}