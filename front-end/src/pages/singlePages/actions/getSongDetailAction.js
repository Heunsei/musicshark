import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const getSongDetailAction = async (song_idx) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'get',
            url: `${URL}/perfectplay/${song_idx}/info`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('노래 상세 데이터 조회 결과 : ', response)
        return response
    } catch (err) {
        console.log(err)
    }
}