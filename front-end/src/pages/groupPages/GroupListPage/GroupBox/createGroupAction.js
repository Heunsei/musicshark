import axios from 'axios'

export const createGroupAction = async (groupDetail) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/sign-up', groupDetail)
        console.log(response)
    } catch(err) {
        console.log(err)
        return {
            error: true,
            err
        }
    }
}