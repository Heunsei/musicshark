import axios from 'axios'

export const registerAction = async (props) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/auth/sign-up',
            data: props
        })
        console.log(response)
    } catch (err) {
        console.log(err)
        return {
            error: true,
            err
        }
    }
}
