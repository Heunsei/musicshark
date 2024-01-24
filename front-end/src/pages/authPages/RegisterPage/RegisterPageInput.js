import React from 'react';

import InputWithLabel from '../../../components/InputWithLabel';
import BirthDateInput from './BirthDateInput';
import SelectGenderBox from './SelectGenderBox';
import { Tooltip } from '@mui/material';
import { validateMail, validatePasswordConfirm } from '../validator';
import { validatePassword } from '../validator';
import { validateNickname } from '../validator'

const RegisterInput = ({
  mail, setMail, password, setPassword, birth, setBirth, passwordConfirm, setPasswordConfirm,
  nickname, setNickname, gender, setGender
}) => {
  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-mail"
        type='email'
        placeholder="이메일을 입력하세요"
        validateState = {validateMail(mail) ? '' : 'check email'}
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="password"
        type='password'
        placeholder="비밀번호를 입력하세요"
        validateState = { validatePassword(password) ? '' : '비밀번호는 8글자이상 16글자 이하로 설정해주세요' }
      />
      <InputWithLabel
        value={passwordConfirm}
        setValue={setPasswordConfirm}
        label="password Confirm"
        type='password'
        placeholder="비밀번호 확인"
        validateState = { validatePasswordConfirm(password, passwordConfirm) ? '' : '비밀번호를 확인해주세요' }
      />
      <InputWithLabel
        value={nickname}
        setValue={setNickname}
        label="nickname"
        type='text'
        placeholder="닉네임을 입력하세요"
        validateState ={ validateNickname(nickname) ? '' : '닉네임은 8~16글자, 특수문자를 제외하고 설정해주세요'} 
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