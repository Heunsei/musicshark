import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../../api/axiosInstance";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const ProfileBox = () => {
  const [iconSize, setIconSize] = useState("250px"); // 아이콘 크기 상태
  const [channels, setChannels] = useState(["채널 1", "채널 2", "채널 3"]); // 목업 채널 데이터
  const [userTier, setUserTier] = useState("");

  // 브라우저 창 크기에 따라 아이콘 크기를 업데이트하는 함수
  const updateIconSize = () => {
    if (window.innerWidth < 600) {
      setIconSize("100px");
    } else if (window.innerWidth >= 600 && window.innerWidth < 900) {
      setIconSize("160px");
    } else {
      setIconSize("260px");
    }
  };

  // 컴포넌트 마운트와 언마운트 시에 이벤트 리스너를 추가하고 제거
  useEffect(() => {
    window.addEventListener("resize", updateIconSize);
    updateIconSize(); // 초기 아이콘 크기 설정

    // 서버로부터 티어 정보를 가져오는 함수
    const fetchUserTier = async () => {
      try {
        const response = await api.get("/user/tier", {
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        console.log("Data:", response.data); // axios는 자동으로 JSON을 파싱합니다.
        setUserTier(response.data.userTier); // 상태 업데이트
      } catch (error) {
        console.error("Error fetching user tier:", error);
      }
    };

    fetchUserTier(); // 함수 호출

    return () => {
      window.removeEventListener("resize", updateIconSize);
    };
  }, []);

  const profileStyle = {
    position: "fixed", // 요소를 화면에 고정
    marginTop: "5%", // 상단으로부터의 마진
    // marginBottom: "0px",
    marginLeft: "2.5%", // 왼쪽으로부터의 마진
    marginRight: "Auto",
    width: "25%", // 너비 설정
    height: "70%", // 높이 설정
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
    width: "50%", // 프로필 이미지 크기를 조정합니다.
    height: "50%", // 프로필 이미지 크기를 조정합니다.
    marginTop: "100px",
    borderRadius: "50%", // 이미지를 원형으로 만듭니다.
    objectFit: "cover", // 이미지 비율을 유지하면서 컨테이너에 맞춥니다.
    border: "3px solid yellow", // 테두리도 티어에 따라 바뀌게 설정해야 함
    marginBottom: "20px", // 텍스트와의 간격을 조정합니다.
  };

  let userImageUrl = null; // 유저 이미지 등록하면 그 이미지로 바뀌게 수정해야 함

  const profileText = {
    backgroundColor: "#764812", // 갈색 배경
    color: "white", // 흰색 텍스트
    fontSize: "32px",
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
    marginTop: "6%",
    marginLeft: "20%",
    fontSize: "22px",
  };

  const channelListStyle = {
    backgroundColor: "#EFD6BC",
    width: "78%",
    height: "26%",
    listStyleType: "none", // 리스트 항목 앞의 기본 마커를 제거합니다.
    paddingLeft: "0", // 기본 패딩을 제거하여 왼쪽 정렬을 맞춥니다.
    marginTop: "-2%",
    paddingTop: "3%",
    paddingLeft: "5%",
    borderRadius: "4%",
  };

  const channelItemStyle = {
    fontSize: "18px",
    marginTop: "2%",
    marginBottom: "5%",
    // textAlign: "left",
  };

  const nameStyle = {
    fontSize: "36px",
    margin: "10px 0", // 상하 마진 설정
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
  };

  const nameTextStyle = {
    flex: 1, // 가능한 모든 공간을 차지
    display: "flex", // 플렉스 레이아웃 사용
    justifyContent: "center", // 가운데 정렬
  };

  const editButtonStyle = {
    color: "white",
    backgroundColor: "#764812",
    border: "#764812",
    padding: "0px 15px", // 상하, 좌우
    height: "60%",
    borderRadius: "25%",
  };

  return (
    <div style={profileStyle}>
      <h3 style={profileText}>프로필</h3>
      {userImageUrl ? (
        <img src="userImageUrl" style={profileImageStyle} />
      ) : (
        <AccountCircleRoundedIcon style={{ fontSize: iconSize, color: "white" }} />
      )}
      <div style={userInfoStyle}>
        <div style={nameTextStyle}>
          <span style={userTierStyle}>{userTier}</span>
          <h2 style={nameStyle}>기타왕김동우</h2>
        </div>
        <button style={editButtonStyle}>수정</button>
      </div>
      <h3 style={channelTextStyle}>소속 채널</h3>
      <ul style={channelListStyle}>
        {channels.map((channel, index) => (
          <li key={index} style={channelItemStyle}>
            {channel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileBox;
