import React, { useState, useEffect } from 'react';
import RegisterAuthBox from '../../../components/RegisterAuthBox';
import RegisterPageHeader from './RegisterPageHeader';
import RegisterInput from './RegisterPageInput';
import RegisterPageFooter from './RegisterPageFooter';
import { useNavigate } from 'react-router-dom';
import { registerAction } from './registerAction'
import { validatePasswordConfirm } from './../validator'
import { registerValidator } from './../validator'
import Navbar from './../../../components/Navbar'

const RegisterPage = () => {
    const navigate = useNavigate()

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [nickname, setNickname] = useState("")
    const [birth, setBirth] = useState('')
    const [gender, setGender] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)
    const [isPasswordValid, setIsPasswordVaild] = useState(false)

    // const [profile, setProfile] = useState("")

    const handleRegister = () => {
        const userDetails = {
            user_email: mail,
            password, nickname, birth, gender
        }
        registerAction(userDetails)
    }

    useEffect(() => {
        setIsFormValid(registerValidator(mail, nickname, gender, birth, isPasswordValid))
    }, [mail, nickname, gender, birth, isPasswordValid, setIsFormValid])

    useEffect(() => {
        setIsPasswordVaild(validatePasswordConfirm(password, passwordConfirm))
    }, [password, passwordConfirm, setIsPasswordVaild, setPasswordConfirm])

    return (
        <>
            <Navbar />
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
                    handleRegister={handleRegister}
                />
            </RegisterAuthBox>
        </>
    );
};

export default RegisterPage;