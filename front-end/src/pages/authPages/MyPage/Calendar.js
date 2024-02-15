import React, { useState, useEffect } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import api from "../../../api/axiosInstance";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import moment from "moment";
import styled from "styled-components";

const queryClient = new QueryClient();

const StyledCalendar = styled(Calendar)`
  width: 96%;
  height: 60%;
  margin-left: auto;
  margin-right: auto;
  background-color: #f9fff8;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-family: "Pretendard-Medium";

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #006edc;
  }

  .react-calendar__tile {
    border: 0.1px solid #f3f3f3; /* 연한 회색 테두리 */
  }

  .react-calendar__month-view__weekdays__weekday:first-child {
    color: red; /* 일요일 */
  }

  .react-calendar__month-view__weekdays__weekday:last-child {
    color: blue; /* 토요일 */
  }

  .sunday {
    color: red; // '일요일'에 대한 스타일
  }

  .saturday {
    color: blue; // '토요일'에 대한 스타일
  }

  * {
    font-weight: 600; /* 모든 텍스트에 적용되는 font-weight */
  }
`;

const dot = {
  height: "8px",
  width: "8px",
  backgroundColor: "#f87171",
  borderRadius: "50%",
  display: "inline-block",
  marginLeft: "1px",
  // marginRight: "0px",
};

const dotContainerStyle = {
  display: "flex",
  justifyContent: "flex-end", // 오른쪽 정렬
  width: "100%", // 컨테이너를 타일의 전체 너비로 설정
  position: "absolute", // 타일 내에서 절대 위치 지정
  bottom: "0", // 타일의 하단에 위치
  right: "0", // 타일의 오른쪽에 위치
};

const absoluteDiv = {
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function MyCalendar() {
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

  const [value, onChange] = useState(new Date());
  const [videos, setVideos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDateVideos, setSelectedDateVideos] = useState([]);
  const [mark, setMark] = useState([]);

  const fetchVideos = async (year, month) => {
    try {
      const accessToken = getCookie("accessToken"); // 쿠키에서 accessToken 가져오기
      const response = await api.get(
        `/videos/personal/search/between?year=${year}&month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching videos data:", error);
      throw new Error("Fetching videos data failed");
    }
  };

  const { data: videosData, refetch } = useQuery(
    ["videosData", value],
    () => fetchVideos(value.getFullYear(), value.getMonth() + 1),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (videosData) {
      setVideos(videosData);
    }
  }, [videosData]);

  useEffect(() => {
    refetch(); // 선택된 날짜가 변경될 때마다 데이터를 다시 가져옵니다.
  }, [value, refetch]);

  const formatShortWeekday = (locale, date) => {
    // 요일을 나타내는 숫자를 얻습니다 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const day = date.getDay();
    // 요일에 따라 한글 문자열을 반환합니다
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return weekdays[day];
  };

  const handleDayClick = (date) => {
    const selectedVideos = videos.filter((video) => moment(video.video_date).isSame(date, "day"));

    // 영상이 존재하는 경우에만 모달 창을 열기
    if (selectedVideos.length > 0) {
      setSelectedDateVideos(selectedVideos);
      setModalIsOpen(true);
    }
  };

  const handleDeleteVideo = async (video_idx) => {
    const isConfirmed = window.confirm("이 영상을 삭제하시겠습니까?");
    if (isConfirmed) {
      try {
        const accessToken = getCookie("accessToken");
        const response = await api.delete(`/videos/personal?boardIdx=${video_idx}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Cache-Control": "no-cache",
          },
        });
        if (response.status === 200) {
          alert("영상이 삭제되었습니다.");

          // 모달 창에 표시되는 영상 목록에서 삭제된 영상을 제거합니다.
          const updatedSelectedVideos = selectedDateVideos.filter(
            (video) => video.video_idx !== video_idx
          );
          setSelectedDateVideos(updatedSelectedVideos); // selectedDateVideos 상태를 업데이트합니다.

          // 전체 영상 목록에서 삭제된 영상을 제거합니다.
          const updatedVideos = videos.filter((video) => video.video_idx !== video_idx);
          setVideos(updatedVideos); // videos 상태를 업데이트합니다.
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        alert("영상 삭제에 실패했습니다.");
      }
    }
  };

  const modalStyle = {
    overlay: {
      zIndex: "1000",
    },
    content: {
      backgroundColor: "#F9FFF8",
    },
  };

  const videoGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3개의 열을 가진 그리드
    gap: "50px", // 그리드 간격
    padding: "20px",
  };

  const videoInfoStyle = {
    display: "flex",
    justifyContent: "space-between", // 내용을 양쪽 끝으로 정렬합니다.
    alignItems: "center", // 세로 중앙 정렬합니다.
    padding: "0 2%", // 양쪽 패딩을 줍니다.
  };

  const videoTitleStyle = {
    flexGrow: 1,
  };

  const deleteButtonStyle = {
    fontFamily: "Pretendard-Medium",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "-1.5%",
    fontWeight: "550",
  };

  return (
    <div>
      <div
        style={{
          textAlign: "right",
          marginTop: "-2.5%",
          marginBottom: "0.4%",
          marginRight: "2.5%",
        }}
      >
        {`${moment(value).format("YYYY년")} ${moment(value).format("M")}월 ${moment(value).format(
          "D"
        )}일`}
      </div>
      <StyledCalendar
        onChange={onChange}
        value={value}
        onActiveStartDateChange={({ activeStartDate }) => {
          onChange(activeStartDate); // 캘린더의 활성 시작 날짜를 업데이트
          refetch(); // 활성 시작 날짜 변경 시 데이터 다시 가져오기
        }}
        onClickDay={handleDayClick}
        locale="en-US"
        formatShortWeekday={formatShortWeekday} // 요일을 '일월화수목금토'로 표시
        tileClassName={({ date, view }) => {
          if (view === "month") {
            if (date.getDay() === 0) {
              // 일요일
              return "sunday";
            } else if (date.getDay() === 6) {
              // 토요일
              return "saturday";
            }
          }
        }}
        tileContent={({ date, view }) => {
          if (
            view === "month" &&
            Array.isArray(videosData) && // videosData가 배열인지 확인
            videosData.some((video) => moment(video.video_date).isSame(date, "day"))
          ) {
            return <div style={dot}></div>;
          }
        }}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Selected Date Videos"
        style={modalStyle}
      >
        <button
          onClick={() => setModalIsOpen(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            border: "none",
            background: "transparent",
            fontSize: "40px",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <h2 style={{ marginTop: "1vw", marginLeft: "1.7vw" }}>영상 목록</h2>
        <div style={videoGridStyle}>
          {selectedDateVideos.map((video) => (
            <div key={video.video_idx}>
              <video style={{ width: "100%", position: "relative" }} controls>
                <source src={video.presigned_url} type="video/mp4" />
                브라우저가 비디오를 지원하지 않습니다.
              </video>
              <div style={videoInfoStyle}>
                <div style={videoTitleStyle}>{video.video_title}</div>
                <button
                  onClick={() => handleDeleteVideo(video.video_idx)}
                  style={deleteButtonStyle}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

function CustomCalendar() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyCalendar />
    </QueryClientProvider>
  );
}

export default CustomCalendar;
