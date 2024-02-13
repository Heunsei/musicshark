const kakaoLoginAPI = `https://kauth.kakao.com/oauth/authorize
?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}
&response_type=code`;

export const KakaoLoginButton = () => {
    return (
        <>
            <a href={kakaoLoginAPI}>
                <img src={process.env.PUBLIC_URL + '/button/kakao_login_medium_wide.png'} />
            </a>
        </>
    );
};