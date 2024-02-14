import { useNavigate, Link } from "react-router-dom";
import styles from './KakaoLoginButton.module.css'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const kakaoLoginAPI = `https://kauth.kakao.com/oauth/authorize
?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}
&response_type=code`;

export const KakaoLoginButton = () => {
    const handleButtonClick = () => {
        window.location.href = kakaoLoginAPI
    }

    return (
        <>
            <button onClick={handleButtonClick} className={styles.kakaoLoginBtn}>
                <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                    <ChatBubbleIcon />
                </div>
                <p style={{ margin: '0 0 0 5px', padding: '0px' }}>카카오 로그인</p>
            </button>
        </>
    );
};