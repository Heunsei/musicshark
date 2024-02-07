import axios from 'axios'

export const loadGroupBoxAction = async () => {
    const accessToken = getCookie('accessToken')
    try {
        const URL = process.env.REACT_APP_API_URL
        const response = await axios({
            method: 'get',
            url: `${URL}/channels`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    } catch (err) {
        console.log(err)
    }
}