import axios from 'axios'
import { getCookie } from './../../../../util/cookie'

export const loadGroupBoxAction = async () => {
    const accessToken = getCookie('accessToken')
    try {
        const URL = process.env.REACT_APP_API_URL
        await axios({
            method: 'get',
            url: `${URL}/channels`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => console.log(res))
            .catch((err) => console.log('에러뜸', err))
    } catch (err) {
        console.log('에러뜸', err.data)
    }
}