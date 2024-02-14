// 비밀번호 8-16자리
export const loginValidator = (mail, password) => {
    const isMailValid = validateMail(mail)
    const isPasswordValid = validatePassword(password)
    return isMailValid && isPasswordValid
}

export const registerValidator = (mail, nickname, gender, birth, isPasswordValid) => {
    const isMailValid = validateMail(mail)
    const isNicknameValid = validateNickname(nickname)
    const isGenderSelected = validateGender(gender)
    const isBirthValid = validateBrith(birth)
    return isMailValid && isNicknameValid && isGenderSelected && isBirthValid && isPasswordValid
}

export const validatePasswordConfirm = (password, passwordConfirm) => {
    if (password === passwordConfirm) {
        return true
    } else {
        return false
    }
}

export const validatePassword = (password) => {
    return password.length >= 8 && password.length < 17
}

export const validateMail = (mail) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(mail);
}

export const validateNickname = (nickname) => {
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
    const isFormValid = regex.test(nickname)
    return nickname.length >=8 && nickname.length < 17 && isFormValid
}

const validateGender = (gender) => {
    if (!gender) {
        return false
    } else {
        return true
    }
}

const validateBrith = (birth) => {
    const inputDate = new Date(birth)
    const today = new Date()
    return inputDate < today
}