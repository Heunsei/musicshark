import axios from 'axios'

const apiClient = axios.create({
    baseURL : 'http://localhost:5002/api',
    timeout : 1000
});

// async function 선언은 AsyncFunction객체를 반환하는 하나의 비동기 함수를 정의
// await > async함수의 실행을 일시 중지하고 전달된 promise의 해결을 기다린 다음 async함수의
// 실행을 다시 시작하고 완료후 값반환

export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data)
    } catch (exception) {
        return {
            error : true,
            exception,
        }
    }
}

export const register = async (data) => {
    try {
        return await apiClient.post('/auth/register', data)
    } catch (exception) {
        return {
            error : true,
            exception,
        }
    }
}

