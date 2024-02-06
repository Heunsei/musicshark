import axios from 'axios'

export const loadGroupBoxAction = async () => {
    try {
        const URL = process.env.REACT_APP_API_URL
        const response = axios({
            method: 'get',
            url: `${URL}/channels`,
            headers: {
                // Authorization : 
            }
        })
    } catch (err) {
        console.log(err)
    }
}