import React from 'react';
import InputWithLabel from '../../../components/InputWithLabel';

const LoginPageInputs = ({ email, setMail, password, setPassword }) => {
    return (
        <>
            <InputWithLabel
                value={email}
                setValue={setMail}
                label="E-mail"
                type='email'
                placeholder="이메일을 입력하세요"
            />
            <InputWithLabel
                value={password}
                setValue={setPassword}
                label="password"
                type='password'
                placeholder="비밀번호를 입력하세요"
            />
        </>
    );
};

export default LoginPageInputs;