import React from "react";

const RecordBox = () => {
  // 카드 스타일
  const cardStyle1 = {
    display: "block",
    marginTop: "7.7%", // Navbar 아래에 위치하도록 마진 조정
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%", // 전체 너비 사용
    height: "420px",
    zIndex: "10",
    backgroundColor: "#EFD6BC",
    borderRadius: "10px",
    padding: "20px",
    justifyContent: "space-around", // 내부 박스가 균등하게 분포하도록
  };

  const cardStyle2 = {
    display: "block",
    textAlign: "left",
    marginTop: "50px", // Navbar 아래에 위치하도록 마진 조정
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%", // 전체 너비 사용
    height: "350px",
    zIndex: "10",
    backgroundColor: "#EFD6BC",
    borderRadius: "10px",
    padding: "20px",
    justifyContent: "space-around", // 내부 박스가 균등하게 분포하도록
  };

  const cardStyle3 = {
    display: "block",
    marginTop: "50px", // Navbar 아래에 위치하도록 마진 조정
    marginBottom: "30px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%", // 전체 너비 사용
    height: "350px",
    zIndex: "10",
    backgroundColor: "#EFD6BC",
    borderRadius: "10px",
    padding: "20px",
    justifyContent: "space-around", // 내부 박스가 균등하게 분포하도록
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center", // 가로축 기준 가운데 정렬
  };

  const innerBoxStyle = {
    display: "flex",
    flexDirection: "column",
    border: "3px solid #ccc",
    borderRadius: "3px",
    backgroundColor: "#F9FFF8",
    paddingTop: "3%",
    width: "30%", // 각 박스가 전체의 30% 차지
    height: "300px",
    textAlign: "center",
    margin: "10px",
    alignItems: "center", // 가로축 기준으로 가운데 정렬합니다.
    // justifyContent: "center", // 세로축 기준으로 가운데 정렬합니다.
  };

  const boxTitle = {
    fontSize: "28px",
    paddingLeft: "18px",
    marginTop: "8px",
  };

  const innerTitle = {
    fontSize: "30px",
  };

  const tierBoxStyle = {
    backgroundColor: "gold", // 'G4' 박스의 배경색을 황금색으로 설정합니다.
    color: "black", // 'G4' 텍스트 색상을 검은색으로 설정합니다.
    padding: "8px 12px", // 적당한 패딩을 추가합니다.
    borderRadius: "5px", // 모서리를 둥글게 합니다.
    fontWeight: "bold", // 글씨를 굵게 합니다.
    marginBottom: "20px", // 'Gold 4' 텍스트와의 간격을 설정합니다.
  };

  const tierTextStyle = {
    fontSize: "32px", // 'Gold 4' 텍스트 크기를 크게 설정합니다.
    color: "black", // 'Gold 4' 텍스트 색상을 검은색으로 설정합니다.
    fontWeight: "bold", // 글씨를 굵게 합니다.
  };

  return (
    <div style={{ display: "block" }}>
      <div style={cardStyle1}>
        <h2 style={boxTitle}>나의 퍼펙트 플레이</h2>
        <div style={containerStyle}>
          <div style={innerBoxStyle}>
            <h2 style={innerTitle}>나의 티어</h2>
            <div style={tierBoxStyle}>G4</div>
            <div style={tierTextStyle}>Gold 4</div>
            <br />
            <button>전체 티어표 보기</button>
          </div>
          <div style={innerBoxStyle}>
            <h2 style={innerTitle}>클리어한 곡</h2>
            <br />
            <div style={tierTextStyle}>24곡</div>
            <br />
            <br />
            <div style={{ fontSize: "20px" }}>총 366곡</div>
          </div>
          <div style={innerBoxStyle}>
            <h2 style={innerTitle}>스트릭</h2>
          </div>
        </div>
      </div>
      <div style={cardStyle2}>
        <h2 style={boxTitle}>내가 작성한 글</h2>
      </div>
      <div style={cardStyle3}>
        <h2 style={boxTitle}>녹화 캘린더</h2>
      </div>
    </div>
  );
};

export default RecordBox;
