import axios from 'axios'
import { getCookie } from '../../../util/cookie'

export const getGroupMemberAction = async (id, setGroupMembers) => {
    console.log(`props로 받아온 id : ${id}`)
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        await axios({
            method: 'get',
            url: `${URL}/channels/${id}/members`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log(res.data.data)
                setGroupMembers(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    } catch (error) {
        return error
    }
}