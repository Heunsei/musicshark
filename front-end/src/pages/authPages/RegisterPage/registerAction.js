import axios from 'axios'

export const registerAction = async (props) => {
    const URL = process.env.REACT_APP_API_URL
    console.log(props)
    try {
        const response = await axios({
            method: 'post',
            url: `${URL}/auth/sign-up`,
            data: props
        })
        console.log(response)

        if (response.data === '이미 존재하는 닉네임' || response.data === '이미 존재하는 이메일') {
            alert(`${response.data}입니다`)
        }
    } catch (err) {
        alert(err)
        return {
            error: true,
            err
        }
    }
}
