import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const checkDuplicateTitle = async (videoTitle) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'get',
            url: `${URL}/videos/personal/find?videoTitle=${videoTitle}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('중복 데이터 확인 결과 : ', response)
        return false
    } catch (err) {
        return true
    }
}