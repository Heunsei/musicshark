import React from 'react';
import styled from '@emotion/styled';

import InputWithLabel from '../../../components/InputWithLabel';
import BirthDateInput from './BirthDateInput';
import SelectGenderBox from './SelectGenderBox';



const RegisterInput = ({
  email, setMail, password, setPassword, birth, setBirth, passwordConfirm, setPasswordConfirm,
  nickname, setNickname, gender, setGender
}) => {
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
        value={passwordConfirm}
        setValue={setPasswordConfirm}
        lable="passwordConfirm"
        type='password'
        placeholder="비밀번호 확인"
      />
      <InputWithLabel
        value={nickname}
        setValue={setNickname}
        lable="nickname"
        type='text'
        placeholder="닉네임을 입력하세요"
      />
      <BirthDateInput
        birth={birth}
        setBirth={setBirth}
      />
      <SelectGenderBox
        gender={gender}
        setGender={setGender}
      />
    </>
  );
};

export default RegisterInput;