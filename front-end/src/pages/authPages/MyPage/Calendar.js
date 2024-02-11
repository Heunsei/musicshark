import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
  font-family: Arial, sans-serif;

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
`;

const dot = {
  height: "8px",
  width: "8px",
  backgroundColor: "#f87171",
  borderRadius: "50%",
  display: "inline-block",
  marginLeft: "1px",
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
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([]);
  const month = moment().format("MM");

  useQuery(
    ["logDate", month],
    async () => {
      const result = await axios.get(`/api/healthLogs?health_log_type=DIET`);
      return result.data;
    },
    {
      onSuccess: (data) => {
        setMark(data);
      },
    }
  );

  const formatShortWeekday = (locale, date) => {
    // 요일을 나타내는 숫자를 얻습니다 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const day = date.getDay();
    // 요일에 따라 한글 문자열을 반환합니다
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return weekdays[day];
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
        {moment(value).format("YYYY년 MM월 DD일")}
      </div>
      <StyledCalendar
        onChange={onChange}
        value={value}
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
          if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return (
              <div style={absoluteDiv}>
                <div style={dot}></div>
              </div>
            );
          }
        }}
      />
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
