import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const getSingleRecordListAction = async () => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'get',
            url: `${URL}/videos/personal`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log('노래 전체 데이터 조회 결과 : ', response)
        return response.data
    } catch (err) {
        console.log(err)
    }
}