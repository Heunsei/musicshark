import React from 'react';
import InputWithLabel from '../../../components/InputWithLabel';
import styled from '@emotion/styled';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const BasicDatePicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label="생년월일을 입력하세요" />
        </DemoContainer>
      </LocalizationProvider>
    );
  }

const RegisterInput = ({ email, setMail, password, setPassword }) => {
    return (
        <>
            <InputWithLabel
                value={email}
                setValue={setMail}
                lable="E-mail"
                type='email'
                placeholder="이메일을 입력하세요"
            />
            <InputWithLabel
                value={password}
                setValue={setPassword}
                lable="password"
                type='password'
                placeholder="비밀번호를 입력하세요"
            />
            <InputWithLabel
                value={password}
                setValue={setPassword}
                lable="password"
                type='password'
                placeholder="비밀번호 확인"
            />
            <InputWithLabel
                value={password}
                setValue={setPassword}
                lable="password"
                type='password'
                placeholder="닉네임을 입력하세요"
            />
            <BasicDatePicker />
        </>
    );
};

export default RegisterInput;