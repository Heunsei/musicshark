import React, { useState } from 'react';
import AuthBox from '../../../components/AuthBox';
import LoginPageInputs from './LoginPageInputs';
import LoginPageHeader from './LoginPageHeader';
import LoginPageFooter from './LoginPageFooter';
import Navbar from './../../../components/Navbar';

const LoginPage = () => {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)

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
                <LoginPageFooter isFormValid={isFormValid}/>
            </AuthBox>
        </>
    );
};

export default LoginPage
