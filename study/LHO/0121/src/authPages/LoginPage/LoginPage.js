import React, { useState, useEffect } from "react"
import AuthBox from "../../shared/components/AuthBox"
import LoginPageHeader from "./LoginPageHeader"
import LoginPageInputs from "./LoginPageInput"
import LoginPageFooter from "./LoginPageFooter"
// default exprt가 아니라서 {} 안에 넣어줘야함
import { validateLoginForm } from './../../shared/utils/validators'
// 컴포넌트와 리덕스를 연동할 떄 사용하는 connect 함수
// connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
// mapStateToProps : 리덕스 안의 상태를 컴포넌트의 props로 넘겨주는 함수
// mapDispatcherToProps : 액션 생성 함수를 컴포넌트의 props로 넘겨주는 함수
import { connect } from 'react-redux'
import { getActions } from './../../store/actions/authActions'
import { useNavigate } from 'react-router-dom'

// login은 auth action에 존재 , userDetails, history를 인자로 받음
function LoginPage({ login }) {
    const navigate = useNavigate();

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)

    const handleLogin = () => {
        const userDetial = {
            mail,
            password
        }
        login({ userDetial, navigate })
    }

    useEffect(() => {
        // validateLoginForm에 인자 두개 넣어서 true를 반환한다면
        // setIsFormValid에 true를 전달해서 isFormValid를 true값으로
        setIsFormValid(validateLoginForm({mail, password}))
    },[mail, password, setIsFormValid])

    return (
        <AuthBox>
            <LoginPageHeader />
            <LoginPageInputs
                mail={mail}
                setMail={setMail}
                password={password}
                setPassword={setPassword}
            />
            {
                // 여기에 버튼, 툴팁 태그(tooltip으로 다 감싸둠) 안내문구 전부 존재
            }
            <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
        </AuthBox>
    )
}

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    }
}

export default connect(null, mapActionsToProps)(LoginPage)