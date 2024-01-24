// 비밀번호 8-16자리
export const loginValidator = (mail, password) =>{
    const isMailValid = validateMail(mail)
    const isPasswordValid = validatePassword(password)
    return isMailValid && isPasswordValid
}

export const registerValidator = () => {
    
    return 
}

export const validatePasswordConfirm = (password, passwordConfirm) => {
    if (password === passwordConfirm){
        return true
    } else {
        return false
    }
}

const validatePassword = (password) => {
    return password.length >= 8 && password.length < 16
}

const validateMail = (mail) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(mail);
}

