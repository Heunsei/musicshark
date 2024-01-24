import axios from 'axios'

export const loginAction = async ( userDetails ) => {
    console.log(userDetails)
    try {
        const response = await axios.post('http://localhost:8080/auth/sign-in', userDetails)
        console.log(response.data)
    } catch (err) {
        console.log(err)
        return {
            error : true,
            err
        }
    }
}