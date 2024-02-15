import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button'
import { styled } from '@mui/system';
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';
import RedirectInfo from '../../../components/RedirectInfo';
import { KakaoLoginButton } from './KakaoLoginButton';


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
    margin: '10px 5px',
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
            <KakaoLoginButton />
            <Button variant='outlined'
                sx={{
                    fontFamily: 'Pretendard-Medium',
                    bgcolor: '#DAE5A3',
                    color: 'black',
                    textTransform: 'none',
                    fontSize: '18px',
                    fontWeight: 500,
                    width: '100%',
                    height: '40px',
                    ':hover': {
                        bgcolor: '#588157',
                        color: 'white',
                    },
                }} onClick={() => { navigate('/register') }}>회원가입</Button>
        </>
    );
};

export default LoginPageFooter;