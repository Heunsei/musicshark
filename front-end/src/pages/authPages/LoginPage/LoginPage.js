import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import AuthBox from '../../../components/AuthBox';
import LoginPageInputs from './LoginPageInputs';
import LoginPageHeader from './LoginPageHeader';
import LoginPageFooter from './LoginPageFooter';
import Navbar from './../../../components/Navbar'
import { loginAction } from './loginAction';
import { loginValidator } from './../validator'
import { KakaoLoginButton } from './KakaoLoginButton';

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // 입력값을 감지하고 서버에 전송할 변수 선언
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [isFormValid, setIsFormValid] = useState(true)


    const handleLogin = () => {
        const userDetails = {
            userEmail: mail,
            password: password
        }
        loginAction(userDetails, dispatch, navigate)
    }

    // mail, password가 바뀔 때 마다 validate check
    useEffect(() => {
        setIsFormValid(loginValidator(mail, password))
    }, [mail, password, setIsFormValid])

    return (
        <>
            <Navbar />
            <AuthBox>
                <LoginPageHeader />
                <LoginPageInputs
                    mail={mail}
                    setMail={setMail}
                    password={password}
                    setPassword={setPassword}
                />
                <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
            </AuthBox>
        </>
    );
};

export default LoginPage
