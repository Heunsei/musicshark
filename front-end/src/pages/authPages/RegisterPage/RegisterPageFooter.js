import React from 'react';
import { Tooltip } from '@mui/material'
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';
import RedirectInfo from '../../../components/RedirectInfo';
import { useNavigate } from 'react-router-dom';

const getFormNotValidMessage = (props) => {
    return '입력값을 확인해 주세요'
}

const getFromValidMessage = () => {
    return 'Press To register'
}

const RegisterPageFooter = (props) => {
    const { isFormValid, handleRegister } = props
    const navigate = useNavigate()

    const handleToPushLoginPage = () => {
        navigate('/login')
    }

    return (
        <>
            <Tooltip
                title={!isFormValid ? getFormNotValidMessage() : getFromValidMessage()}
                slotProps={{
                    tooltip: { sx: { fontSize: '1.5em', maxWidth: 400 } }
                }}
            >
                <div>
                    <CustomPrimaryButton
                        disabled={!isFormValid}
                        label={'회원가입'}
                        onClick={handleRegister}
                    />
                </div>
            </Tooltip>
            <RedirectInfo
                redirectText={'이미 계정을 보유중인가요?'}
                redirectHandler={handleToPushLoginPage}
            />

        </>
    );
};

export default RegisterPageFooter;