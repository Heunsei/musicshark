import React from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

const getFormNotValidMessage = () => {
    return 'Enter correct email address and password should contains between6 and 12 char'
}

const getFromValidMessage = () => {
    return 'Press To Log in'
}


// form이 알맞을 때만 버튼을 활성화 할 것
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
                tooltip : { sx:{fontSize : '1em'}}
            }}
        >
        <div>
            {
                // form isFormValid으로 보이고 on / off 조절
            }
            <CustomPrimaryButton
                label="log in"
                additionalStyles={{ marginTop: '30px' }}
                disabled={!isFormValid}
                onClick={handleLogin}
            />
        </div>
        </Tooltip>
        <RedirectInfo 
            text = 'Need an account?'
            redirectText= 'Create an account'
            additionalStyles={{marginTop : '5px'}}
            redirectHandler={handlePushToRegisterPage}
        />
        </>
    );
};


export default LoginPageFooter;