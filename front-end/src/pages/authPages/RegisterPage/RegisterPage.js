import React, { useState } from 'react';
import AuthBox from '../../../components/AuthBox';
import RegisterPageHeader from './RegisterPageHeader';
import RegisterInput from './RegisterPageInput';

const RegisterPage = () => {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [gender, setGender] = useState("")
    const [birth, setBirth] = useState("")
    const [profile, setProfile] = useState("")

    return (
        <AuthBox>
            <RegisterPageHeader/>
            <RegisterInput 
                mail={mail}
                password={password}
                passwordConfirm={passwordConfirm}
                gender={gender}
                birth={birth}
            />
        </AuthBox>
    );
};

export default RegisterPage;