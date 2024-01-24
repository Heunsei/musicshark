import axios from 'axios'


export const registerAction = async ( userDetails ) => {
    console.log(userDetails)
    try {
        const response = await axios.post('http://localhost:5002/api/auth/register', userDetails)
        console.log(response.data)
    } catch (err) {
        
    }
}
