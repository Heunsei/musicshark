import axios from 'axios'
import { getCookie } from '../../../util/cookie'


/**
 * 
 * @param {int} id 
 * @param {function} setGroupMembers 
 * 해당 id를 가진 그룹의 멤버를 조회 
 */
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