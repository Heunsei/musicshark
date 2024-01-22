import * as api from '../../api'

export const authActions = {
    SET_USER_DETAILS : 'AUTH.SET_USER_DETAILS'
}

// history 객체는 브라우저의 히스토리 정보를 문서와 문서 상태 목록으로 저장하는 객체.
export const getActions = (dispatch) => {
    return {
        login : (userDetails, history) => dispatch(login(userDetails, history)),
        register : (userDetails, history) => dispatch(register(userDetails, history))
    }
}

const setUserDetails = (userDetails) => {
    return {
        type : authActions.SET_USER_DETAILS,
        userDetails, 
    }
}

const login = (userDetails, navigate) => {
    return async (dispatch) => {
        const response = api.login(userDetails);
        // api.js에서 login에 userdata를 넣어서 요청을 보내면 error떳을때 error필드를 true로 반환
        console.log(response)
        if (response.error) {
            // show error message
            
        } else {
            const { userDetails } = response?.data;
            localStorage.setItem('user', JSON.stringify(userDetails));

            dispatch(setUserDetails(userDetails))
            // 다음 컴포넌트로 이동
            navigate('/dashboard')
        }
    }
}

const register = (userDetails, navigate) => {
    return async (dispatch) => {
        const response = await api.register(userDetails);
        // api.js에서 login에 userdata를 넣어서 요청을 보내면 error떳을때 error필드를 true로 반환
        console.log(response)
        console.log(response.status)
        if (response.error) {
            // show error message
            
        } else {
            const { userDetails } = response?.data;
            localStorage.setItem('user', JSON.stringify(userDetails));

            dispatch(setUserDetails(userDetails))
            // 다음 컴포넌트로 이동
            navigate('/dashboard')
        }
    }
}