import React, { useState, useEffect } from 'react';
import AuthBox from '../../../components/AuthBox';
import LoginPageInputs from './LoginPageInputs';
import LoginPageHeader from './LoginPageHeader';
import LoginPageFooter from './LoginPageFooter';
import Navbar from '../../../components/Navbar';

const LoginPage = () => {
    // 입력값을 감지하고 서버에 전송할 변수 선언
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)

    // mail, password가 바뀔 때 마다 validate check
    useEffect(() => {

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
                <LoginPageFooter isFormValid={isFormValid} />
            </AuthBox>
        </>
    );
};

export default LoginPage
