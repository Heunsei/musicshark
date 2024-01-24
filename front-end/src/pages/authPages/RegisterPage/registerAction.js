import axios from 'axios'


export const registerAction = async ( userDetails ) => {
    console.log(userDetails)
    try {
        const response = await axios.post('http://localhost:8080/auth/sign-up', userDetails)
        console.log(response.data)
    } catch (err) {
        
    }
}
