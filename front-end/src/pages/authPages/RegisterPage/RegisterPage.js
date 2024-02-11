import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import RegisterAuthBox from '../../../components/RegisterAuthBox';
import RegisterPageHeader from './RegisterPageHeader';
import RegisterInput from './RegisterPageInput';
import RegisterPageFooter from './RegisterPageFooter';
import { validatePasswordConfirm } from './../validator'
import { registerValidator } from './../validator'
import Navbar from './../../../components/Navbar'
import { registerAction } from './registerAction'
import { loginAction } from '../LoginPage/loginAction';


const RegisterPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [nickname, setNickname] = useState("")
    const [birth, setBirth] = useState('')
    const [gender, setGender] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)
    const [isPasswordValid, setIsPasswordVaild] = useState(false)

    // const [profile, setProfile] = useState("")

    const handleRegister = async () => {
        const userDetails = {
            userEmail: mail,
            password: password,
            nickname: nickname,
            birth: birth,
            gender: gender,
            profile_image: null
        }
        const res = await registerAction(userDetails)
        if (res) {
            const loginData = {
                userEmail: mail,
                password: password,
            }
            loginAction(loginData, dispatch, navigate)
        }
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