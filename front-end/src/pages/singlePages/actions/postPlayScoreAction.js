import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const postPlayScoreAction = async (userIdx, song_idx, avgScore) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')

    try {
        const response = await fetch(`${URL}/perfectplay/${userIdx}`, {
            method: 'POST',
            headers: {
                 Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ song_idx, avgScore }), 
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('퍼펙트플레이 기록 저장', responseData);
        } else {
            console.error('퍼펙트플레이 기록 저장 실패');
        }
    } catch (error) {
        console.error('Error sending AvgScore to backend:', error);
    }
}