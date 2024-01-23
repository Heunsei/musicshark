import React from 'react';
import AuthBox from '../../../components/AuthBox';
import RegisterPageHeader from './RegisterPageHeader';
import RegisterInput from './RegisterInput';

const RegisterPage = () => {
    return (
        <AuthBox>
            <RegisterPageHeader/>
            <RegisterInput />
        </AuthBox>
    );
};

export default RegisterPage;