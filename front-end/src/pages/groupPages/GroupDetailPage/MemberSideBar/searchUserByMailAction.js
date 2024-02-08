import axios from "axios";
import { getCookie } from "../../../../util/cookie";

export const searchUserByMailAction = async (mail, setSearchData) => {
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    try {
        const response = await axios({
            method: 'get',
            url: `${URL}/friend/email-search-list/?userEmail=${mail}`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        setSearchData(response.data.data)
    } catch (err) {
        console.log(err)
    }
}

