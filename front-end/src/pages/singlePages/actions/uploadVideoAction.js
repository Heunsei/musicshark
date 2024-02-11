import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const uploadVideoAction = async (formData) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'post',
            url: `${URL}/videos/personal`,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`
            },
            data: formData
        })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}