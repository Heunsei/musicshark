import axios from 'axios'

export const createGroupAction = async (groupDetail) => {
    console.log(groupDetail)
    try {
        // const response = await axios.post('http://localhost:8080/auth/sign-up', groupDetail)
    } catch(err) {
        console.log(err)
        return {
            error: true,
            err
        }
    }
}