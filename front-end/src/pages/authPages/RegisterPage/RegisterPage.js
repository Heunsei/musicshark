import React, { useState, useEffect } from 'react';
import AuthBox from '../../../components/AuthBox';
import RegisterPageHeader from './RegisterPageHeader';
import RegisterInput from './RegisterPageInput';

const RegisterPage = () => {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [nickname, setNickname] = useState("")
    const [birth, setBirth] = useState('')
    const [gender, setGender] = useState("")
    // const [profile, setProfile] = useState("")
    useEffect(() => {
        console.log(birth)
    },[birth])

    return (
        <AuthBox>
            <RegisterPageHeader/>
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
        </AuthBox>
    );
};

export default RegisterPage;