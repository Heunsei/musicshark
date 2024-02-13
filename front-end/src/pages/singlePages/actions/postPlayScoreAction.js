import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const postPlayScoreAction = async (userIdx, songIdx, avgScore) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')

    try {
        const response = await axios(`${URL}/perfectplay/${userIdx}`, {
            method: 'POST',
            headers: {
                 Authorization: `Bearer ${accessToken}`,
            },
            data : { songIdx, score: avgScore }
        });

        console.log("퍼펙트플레이 기록 저장 : ", response.data);
    } catch (error) {
        console.error('Error sending AvgScore to backend:', error);
    }
}