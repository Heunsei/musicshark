import React from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

const getFormNotValidMessage = () => {
    return 'Username should contains between 3 and 12 character and password should contains between 6 and 12 character.'
}

const getFromValidMessage = () => {
    return 'Press To register'
}


// form이 알맞을 때만 버튼을 활성화 할 것
const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
    const navigate = useNavigate()

    const handlePushToLoginPage = () => {
        navigate("/login")
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
                label="Register"
                additionalStyles={{ marginTop: '30px' }}
                disabled={!isFormValid}
                onClick={handleRegister}
            />
        </div>
        </Tooltip>
        <RedirectInfo 
            text = ''
            redirectText= 'Already have an account ?'
            additionalStyles={{marginTop : '5px'}}
            redirectHandler={handlePushToLoginPage}
        />
        </>
    );
};


export default RegisterPageFooter;