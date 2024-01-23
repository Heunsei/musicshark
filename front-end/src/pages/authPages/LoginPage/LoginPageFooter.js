import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button'
import styled from '@emotion/styled';
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';
import RedirectInfo from '../../../components/RedirectInfo';

const getFormNotValidMessage = () => {
    return ''
}

const getFromValidMessage = () => {
    return 'Press To Log in'
}

const FindUserInfo = styled('p')({
    color: '#00AFF4',
    float: 'right',
    display: 'inline-block',
    margin: '0 5px',
    cursor: 'pointer',
})

// handle login은 loginpage에서 가져와서 넣어줘야함
const LoginPageFooter = ({ handleLogin, isFormValid }) => {
    const navigate = useNavigate()

    const handlePushToPasswordFindPage = () => {
        navigate('/auth/password-find')
    }

    const handlePushToIdFindPage = () => {
        navigate('/auth/id-find')
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
            <div style={{margin : '10px'}}>
                <RedirectInfo
                    redirectText={'비밀번호 찾기'}
                    redirectHandler={handlePushToPasswordFindPage}
                />
                <FindUserInfo>|</FindUserInfo>
                <RedirectInfo
                    redirectText={'아이디 찾기'}
                    redirectHandler={handlePushToIdFindPage}
                />
            </div>
            <Button variant='outlined' sx={{
                bgcolor: '#DAE5A3',
                color: 'black',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                width: '100%',
                height: '40px',
            }} onClick={() => {navigate('/register')}}>회원가입</Button>
        </>
    );
};

export default LoginPageFooter;