import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const ProfileBox = () => {
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

  const [iconSize, setIconSize] = useState("250px"); // 아이콘 크기 상태
  const [userNickname, setUserNickname] = useState("");
  const [userTier, setUserTier] = useState("");
  const [channels, setChannels] = useState([]);
  const [userId, setUserId] = useState(-1); // 유저 ID 상태
  const [userImageUrl, setUserImageUrl] = useState("");
  const navigate = useNavigate(); // useNavigate Hook을 사용합니다.
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicked(false); // 마우스를 떼면 클릭 상태도 초기화
  };
  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);

  // 브라우저 창 크기에 따라 아이콘 크기를 업데이트하는 함수
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

    const fetchUserInfo = async () => {
      try {
        const accessToken = getCookie("accessToken"); // 쿠키에서 accessToken 가져오기
        const response = await api.get("/user/", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 요청 헤더에 인증 토큰 추가
            "Cache-Control": "no-cache",
          },
        });
        console.log("User Info:", response.data); // 응답 데이터 로깅
        setUserNickname(response.data.nickname); // 유저 닉네임 상태 업데이트
        setUserId(response.data.userIdx); // 유저 ID 상태 업데이트
        // 추가로 필요한 유저 정보가 있으면 여기서 상태 업데이트
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    // 서버로부터 티어 정보를 가져오는 함수
    const fetchUserTier = async () => {
      try {
        const accessToken = getCookie("accessToken"); // 쿠키에서 accessToken 가져오기
        const response = await api.get("/user/tier", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 요청 헤더에 인증 토큰 추가
            "Cache-Control": "no-cache",
          },
        });
        console.log("Tier:", response.data); // axios는 자동으로 JSON을 파싱합니다.
        setUserTier(response.data); // 상태 업데이트
      } catch (error) {
        console.error("Error fetching user tier:", error);
      }
    };

    // 채널 정보를 조회하는 새로운 함수
    const fetchChannels = async () => {
      try {
        const accessToken = getCookie("accessToken"); // 쿠키에서 accessToken 가져오기
        const response = await api.get("/channels", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Cache-Control": "no-cache",
          },
        });
        console.log("Channels:", response.data); // 응답 데이터 구조 확인
        const channelData = response.data.data; // 실제 채널 데이터 접근
        if (Array.isArray(channelData)) {
          // 응답 데이터가 배열인지 확인
          setChannels(channelData); // 배열이면 상태 업데이트
        } else {
          console.error("Received data is not an array"); // 배열이 아니면 에러 로깅
        }
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchUserInfo(); // 유저 정보 조회 함수 호출
    fetchUserTier(); // 티어 정보 조회 함수 호출
    fetchChannels(); // 채널 정보 조회 함수 호출

    return () => {
      window.removeEventListener("resize", updateIconSize);
    };
  }, []);

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

  const getTierAbbreviation = (tier) => {
    switch (
      tier.toLowerCase() // 소문자로 변환하여 대소문자 구분 없이 비교
    ) {
      case "bronze":
        return "BR";
      case "silver":
        return "SV";
      case "gold":
        return "GD";
      case "platinum":
        return "PT";
      case "diamond":
        return "DM";
      default:
        return ""; // 일치하는 티어가 없는 경우 빈 문자열 반환
    }
  };

  const getTierStyle = (tier) => {
    const baseStyle = { ...userTierStyle }; // 기본 userTierStyle을 복사하여 사용

    switch (tier) {
      case "bronze":
        return {
          ...baseStyle,
          backgroundColor: "#cd7f32", // Bronze 색상
          border: "#cd7f32",
          color: "white",
          marginLeft: "1.5%",
          marginRight: "3%",
        };
      case "silver":
        return {
          ...baseStyle,
          backgroundColor: "#C0C0C0", // Silver 색상
          border: "#C0C0C0",
          color: "black",
        };
      case "gold":
        return {
          ...baseStyle,
          backgroundColor: "#FFD700", // Gold 색상
          border: "#FFD700",
          color: "white",
        };
      case "platinum":
        return {
          ...baseStyle,
          backgroundColor: "#E5E4E2", // Platinum 색상
          border: "#E5E4E2",
          color: "black",
        };
      case "diamond":
        return {
          ...baseStyle,
          backgroundColor: "#b9f2ff", // Diamond 색상
          border: "#b9f2ff",
          color: "black", // Diamond는 밝은 색상이므로 텍스트 색상을 검정으로 변경
        };
      default:
        return baseStyle; // 일치하는 티어가 없는 경우 기본 스타일 사용
    }
  };

  // 수정 버튼 클릭 시 호출될 함수
  const handleEditClick = () => {
    navigate(`/mypage/${userId}`); // 프로그래매틱 네비게이션으로 페이지 이동
  };

  const profileStyle = {
    position: "fixed", // 요소를 화면에 고정
    marginTop: "4%", // 상단으로부터의 마진
    // marginBottom: "5%",
    marginLeft: "2.5%", // 왼쪽으로부터의 마진
    marginRight: "Auto",
    width: "25%", // 너비 설정
    height: "63%", // 높이 설정
    zIndex: "10", // z-인덱스
    backgroundColor: "rgba(153, 123, 102, 0.6)", // 배경 색상
    borderRadius: "15px", // 테두리 둥글기
    padding: "20px", // 내부 패딩
    overflowY: "visible", // 세로 스크롤바 설정
    display: "flex", // 플렉스박스 레이아웃
    flexDirection: "column", // 요소를 세로로 정렬
    alignItems: "center", // 내부 요소들을 가운데 정렬
  };

  const profileImageStyle = {
    width: "10.3vw", // 프로필 이미지 크기를 조정합니다.
    height: "10.3vw", // 프로필 이미지 크기를 조정합니다.
    marginTop: "0%",
    borderRadius: "50%", // 이미지를 원형으로 만듭니다.
    objectFit: "cover", // 이미지 비율을 유지하면서 컨테이너에 맞춥니다.
    border: "3px solid #FFD600", // 테두리도 티어에 따라 바뀌게 설정해야 함
    marginBottom: "20px", // 텍스트와의 간격을 조정합니다.
  };

  // let userImageUrl = `${process.env.PUBLIC_URL}/shark1.png`;

  const profileText = {
    backgroundColor: "#764812", // 갈색 배경
    color: "white", // 흰색 텍스트
    fontSize: "26px",
    zIndex: "16", // z-인덱스
    marginTop: "-36px",
    marginBottom: "20px",
    paddingTop: "8px", // 내부 여백
    paddingBottom: "8px",
    paddingLeft: "70px",
    paddingRight: "70px",
    borderRadius: "26px", // 둥근 모서리
    textAlign: "center", // 텍스트 중앙 정렬
  };

  const channelTextStyle = {
    textAlign: "left", // 텍스트를 왼쪽으로 정렬
    width: "100%", // 부모 컨테이너의 전체 너비를 차지하도록 설정
    marginTop: "5.5%",
    marginLeft: "12%",
    fontSize: "17px",
  };

  const channelListStyle = {
    backgroundColor: "#EFD6BC",
    width: "82%",
    height: "26%",
    border: "solid #615750",
    listStyleType: "none", // 리스트 항목 앞의 기본 마커를 제거합니다.
    marginTop: "-3%",
    paddingTop: "3%",
    paddingLeft: "5%",
    paddingRight: "3%",
    borderRadius: "0%",
    overflowY: "auto",
  };

  const channelItemStyle = {
    fontSize: "16px",
    fontWeight: "650",
    marginTop: "1%",
    marginBottom: "5%",
    marginLeft: "1%",
    paddingBottom: "1%",
    // textAlign: "left",
    borderBottom: "1px solid #C7BDB6",
  };

  const nameStyle = {
    fontSize: "24px",
    marginTop: "10px",
    marginBottom: "10px",
  };

  const userInfoStyle = {
    display: "flex", // 플렉스 레이아웃 사용
    width: "100%", // 컨테이너의 너비를 최대로 설정
    justifyContent: "space-between", // 항목 사이의 공간을 균등하게 분배
    alignItems: "center", // 세로 방향으로 가운데 정렬
  };

  const userTierStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // 수평 중앙 정렬 추가
    margin: "3.2% 3.7% 3.2% -3.7%",
    width: "12%", // 필요에 따라 조정하거나 제거
    border: "solid", // 필요에 따라 테두리 스타일을 조정
    borderRadius: "15%",
  };

  const nameTextStyle = {
    flex: 1, // 가능한 모든 공간을 차지
    display: "flex", // 플렉스 레이아웃 사용
    justifyContent: "center", // 가운데 정렬
  };

  const editButtonStyle = {
    width: "12%",
    color: "white",
    backgroundColor: "#764812",
    border: "#764812",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    height: "60%",
    borderRadius: "10%",
  };

  const dynamicButtonStyle = {
    ...editButtonStyle,
    backgroundColor: isClicked
      ? "#9e5f42"
      : isHovered
      ? "#886048"
      : editButtonStyle.backgroundColor,
  };

  return (
    <div style={profileStyle}>
      <h3 style={profileText}>프로필</h3>
      {userImageUrl ? (
        <img src={userImageUrl} style={profileImageStyle} />
      ) : (
        <AccountCircleRoundedIcon style={{ fontSize: iconSize, color: "white" }} />
      )}
      <div style={userInfoStyle}>
        <div style={nameTextStyle}>
          <span style={getTierStyle(userTier)}>{getTierAbbreviation(userTier)}</span>
          <h2 style={nameStyle}>{userNickname}</h2>
        </div>
        <button
          style={dynamicButtonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleEditClick}
        >
          수정
        </button>
      </div>
      <h3 style={channelTextStyle}>소속 채널</h3>
      <ul style={channelListStyle}>
        {channels.map((channel) => (
          <li key={channel.channelIdx} style={channelItemStyle}>
            > {channel.channelName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileBox;
