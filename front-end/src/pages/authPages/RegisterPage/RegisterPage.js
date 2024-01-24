import React, { useState, useEffect } from 'react';
import RegisterAuthBox from '../../../components/RegisterAuthBox';
import RegisterPageHeader from './RegisterPageHeader';
import RegisterInput from './RegisterPageInput';
import RegisterPageFooter from './RegisterPageFooter';

const RegisterPage = () => {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [nickname, setNickname] = useState("")
    const [birth, setBirth] = useState('')
    const [gender, setGender] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)

    // const [profile, setProfile] = useState("")

    return (
        <RegisterAuthBox>
            <RegisterPageHeader />
            <RegisterInput
                mail={mail}
                setMail={setMail}
                password={password}
                setPassword={setPassword}
                passwordConfirm={passwordConfirm}
                setPasswordConfirm={setPasswordConfirm}
                nickname={nickname}
                setNickname={setNickname}
                gender={gender}
                setGender={setGender}
                birth={birth}
                setBirth={setBirth}
            />
            <RegisterPageFooter 
                isFormValid={isFormValid}
            />
        </RegisterAuthBox>
    );
};

export default RegisterPage;