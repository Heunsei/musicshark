import axios from 'axios'
import { getCookie } from '../../../util/cookie'

const loadGroupAction = async (setGroupList) => {
    const accessToken = getCookie('accessToken')
    const URL = process.env.REACT_APP_API_URL
    try {
        await axios({
            method: 'get',
            url: `${URL}/channels`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                setGroupList(res.data.data)
            })
    } catch (err) {
        console.log(err)
    }
}

export default loadGroupAction