import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { setCookie } from '../../../util/cookie';
import getUserAction from './getUserAction';
import axios from "axios";

const KakaoLoginHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = new URL(window.location.href);
                const code = url.searchParams.get("code");

                if (code) {
                    // 쿼리 파라미터가 있는 경우에만 처리
                    url.searchParams.delete("code"); // 중복 호출 방지를 위해 쿼리 파라미터 삭제
                    window.history.replaceState({}, document.title, url); // 브라우저 히스토리 업데이트

                    await axios({
                        method: "get",
                        url: `${process.env.REACT_APP_API_URL}/auth/kakao?code=${code}`,
                    }).then((response) => {
                        const ACCESS_TOKEN = response.data.accessToken
                        const REFRESH_TOKEN = response.data.refreshToken
                        if (ACCESS_TOKEN) {
                            setCookie('accessToken', ACCESS_TOKEN, {
                                path: '/',
                                secure: true,
                                sameSite: 'none',
                            });
                        }
                        if (REFRESH_TOKEN) {
                            setCookie('refreshToken', REFRESH_TOKEN, {
                                path: '/',
                                secure: true,
                                sameSite: 'none',
                            });
                        }
                        if (ACCESS_TOKEN && REFRESH_TOKEN) {
                            getUserAction(ACCESS_TOKEN, dispatch, navigate)
                        }
                    }).catch((error) => {
                        const status = error.response.status;
                        if(status === 404){
                            window.alert("가입되어 있지 않는 회원입니다. 회원가입 페이지로 이동합니다.");
                            navigate("/register", {
                                state: {
                                    email: error.response.data.email, 
                                    kakao: error.response.data.kakao
                                }
                            });
                        }
                        else {
                            // console.log(error.response);
                            window.alert(`${error.response.data} 메인 페이지로 이동합니다.`);
                            // window.alert("탈퇴한 회원입니다. 메인 페이지로 이동합니다.");
                            navigate("/");
                        }
                    });
                }
            } catch (error) {
                console.error("에러:", error);
            }
        };

        fetchData();
    }, [navigate]);

    return null;
};

export default KakaoLoginHandler;
