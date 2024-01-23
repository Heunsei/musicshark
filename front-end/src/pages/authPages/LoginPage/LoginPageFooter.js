import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import RedirectInfo from '../../../components/RedirectInfo';
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';
import styled from '@emotion/styled';

const getFormNotValidMessage = () => {
    return 'Enter correct email address and password should contains between6 and 12 char'
}

const getFromValidMessage = () => {
    return 'Press To Log in'
}

const FindUserInfo = styled('p')({
    float : 'right',
    display: 'inline-block',
    margin: '0 5px',
})

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
    const navigate = useNavigate()
    const handlePushToRegisterPage = () => {
        navigate("/register")
    }
    return (
        <>
            <Tooltip
                title={!isFormValid ? getFormNotValidMessage() : getFromValidMessage()}
                slotProps={{
                    tooltip: { sx: { fontSize: '1em' } }
                }}
            >
                <div>
                    <CustomPrimaryButton
                        label="log in"
                        additionalStyles={{ marginTop: '30px' }}
                        disabled={!isFormValid}
                        onClick={handleLogin}
                    />
                </div>
            </Tooltip>
            <div>
                <FindUserInfo>비밀번호 찾기</FindUserInfo>
                <FindUserInfo>|</FindUserInfo>
                <FindUserInfo>아이디찾기</FindUserInfo>
            </div>
        </>
    );
};

export default LoginPageFooter;