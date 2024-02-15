import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";
import api from "../../../api/axiosInstance";
import Navbar from "../../../components/Navbar";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { validateNickname, validatePassword, validatePasswordConfirm } from "../validator";
import * as setUser from "./../../../redux/store/userSlice";

const ProfileEdit = () => {
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const { userId } = useParams(); // URL에서 userId 값을 추출
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    email: "",
    birth: "",
    gender: "",
    nickname: "",
    profileImage: "", // 사용자 이미지 URL을 가정
  });
  const [userImageUrl, setUserImageUrl] = useState("");
  const [iconSize, setIconSize] = useState("250px");

  const [newNickname, setNewNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const [existPassword, setExistPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const [isNicknameHovered, setIsNicknameHovered] = useState(false);
  const [isNicknameClicked, setIsNicknameClicked] = useState(false);
  const [isPasswordHovered, setIsPasswordHovered] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);

  const handleNicknameMouseEnter = () => setIsNicknameHovered(true);
  const handleNicknameMouseLeave = () => {
    setIsNicknameHovered(false);
    setIsNicknameClicked(false);
  };
  const handleNicknameMouseDown = () => setIsNicknameClicked(true);
  const handleNicknameMouseUp = () => setIsNicknameClicked(false);

  const handlePasswordMouseEnter = () => setIsPasswordHovered(true);
  const handlePasswordMouseLeave = () => {
    setIsPasswordHovered(false);
    setIsPasswordClicked(false);
  };
  const handlePasswordMouseDown = () => setIsPasswordClicked(true);
  const handlePasswordMouseUp = () => setIsPasswordClicked(false);

  const updateIconSize = () => {
    if (window.innerWidth < 550) {
      setIconSize("100px");
    } else if (window.innerWidth >= 550 && window.innerWidth < 950) {
      setIconSize("130px");
    } else {
      setIconSize("180px");
    }
  };

  // 컴포넌트 마운트와 언마운트 시에 이벤트 리스너를 추가하고 제거
  useEffect(() => {
    window.addEventListener("resize", updateIconSize);
    updateIconSize(); // 초기 아이콘 크기 설정

    return () => {
      window.removeEventListener("resize", updateIconSize);
    };
  }, []);

  // 사용자 정보를 가져오는 함수
  useEffect(() => {
    // 여기서 사용자 프로필 데이터를 가져오고 상태를 업데이트
    const fetchProfile = async () => {
      try {
        const accessToken = getCookie("accessToken"); // 쿠키에서 accessToken 가져오기
        const response = await api.get("/user/", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 요청 헤더에 인증 토큰 추가
            "Cache-Control": "no-cache",
          },
        });
        console.log("User Info:", response.data); // 응답 데이터 로깅
        const email = response.data.userEmail;
        const birth = response.data.birth;
        const gender = response.data.gender;
        const nickname = response.data.nickname;
        const profileImage = response.data.profileimage;
        setProfile({
          email: email,
          birth: birth,
          gender: gender,
          nickname: nickname,
          profileImage: profileImage,
        });
        // 추가로 필요한 유저 정보가 있으면 여기서 상태 업데이트
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    // userId에 따라 userImageUrl 업데이트
    const updateUserImageUrl = () => {
      const imageIndex = userId % 3; // userId를 4로 나눈 나머지를 사용하여 이미지 인덱스 결정
      setUserImageUrl(`${process.env.PUBLIC_URL}/shark${imageIndex + 1}.png`); // 이미지 인덱스에 1을 더해 실제 이미지 파일명과 매칭
    };

    if (userId !== -1) {
      // userId가 설정된 후에만 이미지 URL 업데이트 실행
      updateUserImageUrl();
    }
  }, [userId]); // userId 값이 변경될 때마다 실행

  const formatBirthDate = (birthDate) => {
    if (!birthDate) return "";

    const date = new Date(birthDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // '01' ~ '12'
    const day = date.getDate().toString().padStart(2, "0"); // '01' ~ '31'

    // MM과 DD가 01~09인 경우 앞의 0을 제거하여 'M월' 또는 'D일'로 표시
    const formattedMonth = month.startsWith("0") ? month.slice(1) : month;
    const formattedDay = day.startsWith("0") ? day.slice(1) : day;

    return `${year}년 ${formattedMonth}월 ${formattedDay}일`;
  };

  const handleNicknameChange = (event) => {
    // setNewNickname(event.target.value);
    const newNickname = event.target.value;
    setNewNickname(newNickname);
    // 실시간으로 닉네임 유효성 검사를 수행합니다.
    if (!validateNickname(newNickname)) {
      setNicknameError("닉네임은 특수 문자를 제외하고 8 ~ 16글자로 설정해주세요.");
    } else {
      setNicknameError("");
    }
    if (newNickname && !validateNickname(newNickname)) {
      setNicknameError("닉네임은 특수 문자를 제외하고 8 ~ 16글자로 설정해주세요.");
    } else {
      setNicknameError(""); // 유효한 닉네임이거나 입력 필드가 비어있는 경우 에러 메시지를 지웁니다.
    }
  };

  const handleNicknameBlur = () => {
    // 포커스가 입력 필드에서 벗어났을 때 유효성 검사를 수행합니다.
    if (newNickname && !validateNickname(newNickname)) {
      setNicknameError("닉네임은 특수 문자를 제외하고 8 ~ 16글자로 설정해주세요.");
    } else {
      setNicknameError(""); // 입력 필드가 비어있거나 닉네임이 유효한 경우 에러 메시지를 지웁니다.
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateNickname(newNickname)) {
      // 유효하지 않은 경우, alert 메시지를 표시하고 함수 실행을 중단
      alert("닉네임은 특수 문자를 제외하고 8 ~ 16글자로 설정해주세요.");
      return; // 함수 실행 중단
    }

    const accessToken = getCookie("accessToken");
    try {
      const response = await api.patch(
        "/user/patch",
        {
          nickname: newNickname,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // 필요한 경우 다른 헤더 추가
          },
        }
      );
      console.log("Nickname updated:", response.data);
      alert("닉네임이 변경되었습니다.");
      dispatch(setUser.setNickname(newNickname));
      navigate(`/mypage/${userId}`, { replace: true }); // 프로필 페이지로 리디렉션
      window.location.reload(); // 페이지 새로고침
      // fetchProfile();
    } catch (error) {
      console.error("Error updating nickname:", error);
      alert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 비밀번호 변경 핸들러
  const handleExistPasswordChange = (event) => {
    const existPassword = event.target.value;
    setExistPassword(existPassword);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    if (event.target.value && !validatePassword(event.target.value)) {
      setPasswordError("비밀번호는 8 ~ 16글자로 설정해주세요.");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);

    if (event.target.value && !validatePasswordConfirm(newPassword, event.target.value)) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmError(""); // 비밀번호가 일치하거나 입력 필드가 비어 있는 경우 에러 메시지를 지웁니다.
    }
  };

  const handleSubmitPasswordChange = async (event) => {
    event.preventDefault();

    // 1번 조건문: 새 비밀번호 유효성 검사
    if (!validatePassword(newPassword)) {
      alert("비밀번호는 8 ~ 16글자로 설정해주세요.");
      return;
    }

    // 2번 조건문: 새 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (!validatePasswordConfirm(newPassword, passwordConfirm)) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    const accessToken = getCookie("accessToken");
    try {
      const response = await api.patch(
        "/user/patch/password",
        {
          existPassword: existPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200 && response.data.message === "현재 비밀번호가 다릅니다.") {
        console.log("Password not updated:", response.data);
        alert("현재 비밀번호를 잘못 입력했습니다.");
      } else {
        console.log("Password updated:", response.data);
        alert("비밀번호가 변경되었습니다.");
        navigate(`/mypage/${userId}`, { replace: true });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const containerStyle = {
    display: "grid",
    gridTemplateRows: "7% 93%",
    height: "100vh", // 뷰포트 높이로 설정
    overflow: "hidden", // 오버플로 숨김
  };

  const leftBoxStyle = {
    flex: 2.5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // 가로축 기준으로 중앙에 배치합니다.
    justifyContent: "flex-start", // 세로축 기준으로 상단에 배치합니다.
    height: "82%",
    padding: "20px",
    marginTop: "1%",
    borderRight: "3px solid #9C9888",
    // backgroundColor: "rgba(153, 123, 102, 0.6)", // 배경 색상
    // borderRadius: "15px", // 테두리 둥글기
    // zIndex: "0", // z-인덱스
  };

  const rightBoxStyle = {
    flex: 7.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // 내용을 공간에 균등하게 배치
    alignItems: "flex-start", // 상단에 항목을 정렬
    height: "82%",
    marginLeft: "3%",
  };

  const profileImageStyle = {
    width: "10.3vw", // 프로필 이미지 크기를 조정합니다.
    height: "10.3vw", // 프로필 이미지 크기를 조정합니다.
    marginTop: "20%",
    marginBottom: "12%",
    borderRadius: "50%", // 이미지를 원형으로 만듭니다.
    objectFit: "cover", // 이미지 비율을 유지하면서 컨테이너에 맞춥니다.
    border: "3px solid #FFD600", // 테두리도 티어에 따라 바뀌게 설정해야 함
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
  };

  const profileInfoStyle = {
    marginTop: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // 왼쪽 정렬
    width: "100%", // 전체 너비 차지
  };

  const infoKeyStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "1%",
    marginLeft: "17%",
  };

  const infoValueStyle = {
    border: "3px solid gray",
    backgroundColor: "#F9FFF8",
    borderRadius: "4px",
    width: "65%",
    height: "20%",
    marginTop: "2%",
    marginBottom: "10%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "auto",
    paddingBottom: "auto",
    // paddingLeft: "3%",
    // paddingRight: "auto",
    fontSize: "18px",
    textAlign: "center",
  };

  const sectionTitleStyle = {
    fontSize: "22px",
    marginTop: "3%",
    marginBottom: "7%",
  };

  const leftColumnStyle = {
    display: "flex",
    flexDirection: "column",
    flex: 1, // Takes half the space
    height: "95%",
    marginRight: "2%",
    borderRight: "1px dotted #9C9888",
    paddingTop: "1%",
    marginTop: "5%",
  };

  const rightColumnStyle = {
    display: "flex",
    flexDirection: "column",
    height: "95%",
    flex: 1, // Takes half the space
    marginLeft: "2%",
    paddingTop: "1%",
    marginTop: "5%",
  };

  const boxKeyStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "1%",
    marginLeft: "2%",
  };

  const boxValueStyle = {
    border: "3px solid gray",
    backgroundColor: "#F9FFF8",
    borderRadius: "4px",
    width: "80%",
    height: "6.5%",
    marginTop: "2%",
    marginBottom: "10%",
    marginLeft: "2%",
    // marginRight: "auto",
    paddingLeft: "2%",
    fontSize: "17px",
    display: "flex",
    alignItems: "center", // 텍스트를 수직 중앙 정렬
  };

  const inputStyle = {
    display: "block", // input을 블록 레벨 요소로 만듦
    border: "3px solid gray",
    backgroundColor: "#F9FFF8",
    borderRadius: "4px",
    width: "79.6%",
    marginTop: "2%",
    marginBottom: "1%",
    marginLeft: "2%",
    // marginRight: "auto",
    paddingLeft: "2%",
    fontSize: "17px",
    // display: "flex",
    alignItems: "center", // 텍스트를 수직 중앙 정렬
    // boxSizing: "border-box",
    height: "21%",
  };

  const inputStyle2 = {
    display: "block", // input을 블록 레벨 요소로 만듦
    border: "3px solid gray",
    backgroundColor: "#F9FFF8",
    borderRadius: "4px",
    width: "79.6%",
    marginTop: "2%",
    marginBottom: "10.7%",
    marginLeft: "2%",
    // marginRight: "auto",
    paddingLeft: "2%",
    fontSize: "17px",
    // display: "flex",
    alignItems: "center", // 텍스트를 수직 중앙 정렬
    // boxSizing: "border-box",
    height: "8.3%",
  };

  const inputStyle3 = {
    display: "block", // input을 블록 레벨 요소로 만듦
    border: "3px solid gray",
    backgroundColor: "#F9FFF8",
    borderRadius: "4px",
    width: "79.6%",
    marginTop: "2%",
    marginBottom: "1%",
    marginLeft: "2%",
    // marginRight: "auto",
    paddingLeft: "2%",
    fontSize: "17px",
    // display: "flex",
    alignItems: "center", // 텍스트를 수직 중앙 정렬
    // boxSizing: "border-box",
    height: "8.3%",
  };

  const inputStyle4 = {
    display: "block", // input을 블록 레벨 요소로 만듦
    border: "3px solid gray",
    backgroundColor: "#F9FFF8",
    borderRadius: "4px",
    width: "79.6%",
    marginTop: "2%",
    marginBottom: "1%",
    marginLeft: "2%",
    // marginRight: "auto",
    paddingLeft: "2%",
    fontSize: "17px",
    // display: "flex",
    alignItems: "center", // 텍스트를 수직 중앙 정렬
    // boxSizing: "border-box",
    height: "8.3%",
  };

  const buttonStyle = {
    fontFamily: "Pretendard-Medium",
    // position: 'absolute',
    width: "19%",
    height: "25%",
    color: "white",
    fontWeight: "570",
    backgroundColor: "#764812",
    border: "#764812",
    top: "150%", // 입력 필드의 하단에서 시작
    left: "50%",
    marginTop: "-30%",
    marginLeft: "66%",
    // marginRight: "3%",
    // paddingTop: "0px",
    // paddingBottom: "0px",
    // paddingLeft: "0px",
    // paddingRight: "0px",
    borderRadius: "5%",
  };

  const buttonStyle2 = {
    fontFamily: "Pretendard-Medium",
    width: "22%",
    height: "10%",
    color: "white",
    fontWeight: "570",
    backgroundColor: "#764812",
    border: "#764812",
    top: "200%", // 입력 필드의 하단에서 시작
    left: "50%",
    marginTop: "-50%",
    marginLeft: "63%",
    // marginRight: "3%",
    // paddingTop: "0px",
    // paddingBottom: "0px",
    // paddingLeft: "0px",
    // paddingRight: "0px",
    borderRadius: "5%",
  };

  const dynamicNicknameButtonStyle = {
    ...buttonStyle,
    backgroundColor: isNicknameClicked
      ? "#9e5f42"
      : isNicknameHovered
      ? "#886048"
      : buttonStyle.backgroundColor,
  };

  const dynamicPasswordButtonStyle = {
    ...buttonStyle2,
    backgroundColor: isPasswordClicked
      ? "#9e5f42"
      : isPasswordHovered
      ? "#886048"
      : buttonStyle.backgroundColor,
  };

  const errorStyle = {
    color: "red",
    fontSize: "14px",
    fontWeight: "550",
    marginLeft: "4%",
    marginBottom: "4%",
    minHeight: "20px",
  };

  return (
    <div style={containerStyle}>
      <div>
        <Navbar />
      </div>
      <div style={{ display: "flex", width: "100%", height: "94%", marginTop: "4%" }}>
        <div style={leftBoxStyle}>
          <div>
            {userImageUrl ? (
              <img src={userImageUrl} style={profileImageStyle} />
            ) : (
              <AccountCircleRoundedIcon style={{ fontSize: iconSize, color: "#997B66" }} />
            )}
          </div>
          <div style={profileInfoStyle}>
            <div style={infoKeyStyle}>이메일</div>
            <div style={infoValueStyle}>{profile.email}</div>
            <div style={infoKeyStyle}>생년월일</div>
            <div style={infoValueStyle}>{formatBirthDate(profile.birth)}</div>
            <div style={infoKeyStyle}>성별</div>
            <div style={infoValueStyle}>
              {profile.gender.toLowerCase() === "male"
                ? "남자"
                : profile.gender.toLowerCase() === "female"
                ? "여자"
                : ""}
            </div>
          </div>
        </div>
        <div style={rightBoxStyle}>
          <div style={leftColumnStyle}>
            <div style={sectionTitleStyle}>닉네임 변경</div>
            <div style={boxKeyStyle}>현재 닉네임</div>
            <div style={boxValueStyle}>{profile.nickname}</div>
            <form onSubmit={handleSubmit}>
              <label>
                <div style={boxKeyStyle}>새로운 닉네임</div>
                <input
                  style={inputStyle}
                  type="text"
                  value={newNickname}
                  onChange={handleNicknameChange}
                  onBlur={handleNicknameBlur}
                />
              </label>
              <div style={errorStyle}>{nicknameError || " "}</div>
              <button
                style={dynamicNicknameButtonStyle}
                onMouseEnter={handleNicknameMouseEnter}
                onMouseLeave={handleNicknameMouseLeave}
                onMouseDown={handleNicknameMouseDown}
                onMouseUp={handleNicknameMouseUp}
                type="submit"
              >
                닉네임 변경
              </button>
            </form>
          </div>
          <div style={rightColumnStyle}>
            <div style={sectionTitleStyle}>비밀번호 변경</div>
            <form onSubmit={handleSubmitPasswordChange}>
              <label>
                <div style={boxKeyStyle}>현재 비밀번호</div>
                <input
                  style={inputStyle2}
                  type="password"
                  value={existPassword}
                  onChange={handleExistPasswordChange}
                />
                <div style={boxKeyStyle}>새로운 비밀번호</div>
                <input
                  style={inputStyle3}
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
              </label>
              <div style={errorStyle}>{passwordError || " "}</div>
              {/* {passwordError && <div style={errorStyle}>{passwordError}</div>} */}
              <label>
                <div style={boxKeyStyle}>비밀번호 확인</div>
                <input
                  style={inputStyle4}
                  type="password"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                />
              </label>
              <div style={errorStyle}>{passwordConfirmError || " "}</div>
              {/* {passwordConfirmError && <div style={errorStyle}>{passwordConfirmError}</div>} */}
              <button
                style={dynamicPasswordButtonStyle}
                onMouseEnter={handlePasswordMouseEnter}
                onMouseLeave={handlePasswordMouseLeave}
                onMouseDown={handlePasswordMouseDown}
                onMouseUp={handlePasswordMouseUp}
                type="submit"
              >
                비밀번호 변경
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
