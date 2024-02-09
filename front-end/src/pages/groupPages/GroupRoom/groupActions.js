import axios from 'axios'

export const createSession = async (sessionId) => {
    try {
        const response = await axios({
            url: `${process.env.REACT_APP_OPENVIDU_URL}/api/sessions`,
            method: 'post',
            data: { customSessionId: sessionId },
            headers: {
                Authorization: `Basic ${process.env.OPENVIDU_AUTH}`,
                'Content-Type': 'application/json'
            },
        })
        console.log('받아온 sessionId 데이터 : ', response.data)
        return response.data // 세선 아이디를 반환
    } catch (error) {
        console.log('getSession 에서 오류')
        console.log(error)
    }
}

export const deleteSession = async (sessionId) => {
    try {
        const response = await axios({
            url: `${process.env.REACT_APP_OPENVIDU_URL}/api/sessions/${sessionId}`,
            method: 'delete',
            headers: {
                Authorization: `Basic ${process.env.OPENVIDU_AUTH}`,
            },
        })
        console.log(response)
    } catch (error) {
        console.log('deleteSession에서 오류')
        console.log(error)
    }
}

export const createToken = async (sessionId) => {
    try {
        const response = await axios({
            url: `${process.env.REACT_APP_OPENVIDU_URL}/api/sessions/${sessionId}/connection`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        console.log('받아온 token 데이터 : ', response.data)
        return response.data // 세션에 접속했다는 뜻
    } catch (error) {
        console.log('createToken에서 오류')
        console.log(error);
    }
}

export const getToken = async (mySessionId) => {
    const res = await createSession(mySessionId)
    return await createToken(mySessionId)
}