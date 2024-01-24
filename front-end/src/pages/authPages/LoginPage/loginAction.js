import axios from 'axios'

export const loginAction = async ( userDetails ) => {
    console.log(userDetails)
    try {
        const response = await axios.post('http://localhost:5002/api/auth/login', userDetails)
        console.log(response.data)
        localStorage.setItem('user', JSON.stringify(userDetails));
    } catch (err) {
        console.log(err)
        return {
            error : true,
            err
        }
    }
}