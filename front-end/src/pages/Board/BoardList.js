import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { styled, Table, TableCell, tableCellClasses, TableHead, TableRow, TableBody, Button, Typography } from "@mui/material";
import Navbar from './../../components/Navbar';
import { getCookie } from "../../util/cookie";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: "bold",
  color: 'black',
  padding: '16px',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(239, 214, 188, 0.8)',
    color: 'rgba(153, 123, 102)',
    fontSize: 15,
    padding: '16px',
  },
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.common.black,
    fontSize: 15,
  },
}));

const StyledTable = styled(Table)({
  width: '70%',
  borderCollapse: 'collapse',
  '& thead tr': {
    borderTop: '1px solid #4B3621',
    borderBottom: '1px solid #4B3621',
  },
  '& tbody tr:last-child td': {
    borderBottom: '1px solid #4B3621',
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  textAlign: 'center',
  '&:nth-of-type(odd)': {
    backgroundColor: 'transparent',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  border: "1px solid #997B66",
  color: "#4B3621",
  backgroundColor: "transparent",
  padding: "10px 20px",
  fontSize: "16px",
  transition: "background-color 0.3s, color 0.3s",
  '&:hover': {
    backgroundColor: "#886451",
    color: "white",
  },
}));

const BoldText = ({ children }) => <span style={{ fontWeight: "bold", color: "black", fontSize: "17px" }}>{children} </span>;

function createData(boardIdx, boardTitle, userIdx, boardCount, boardDate) {
  return { boardIdx, boardTitle, userIdx, boardCount, boardDate };
}

const rows = [
  createData(1, '자유', '가입', 'kim@ssafy.com', 6, '2024-02-01'),
  createData(2, '자유', '인사', 'kim@ssafy.com', 6, '2024-02-01'),
];

export default function BoardList() {
  const [rows, setRow] = useState([])
  const authToken = getCookie('accessToken')
  const URL = process.env.REACT_APP_API_URL
  const navigate = useNavigate();

  const getBoardList = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${URL}/board`,
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log(res.data[0].boardTitle);
      const processedData = res.data.map(item => ({
        ...item,
        boardDate: item.boardDate.slice(0, 10)
      }));
      await setRow(processedData);
    } catch (err) {
      console.log(err);
    }
  }

  const moveToCreate = () => {
    navigate('/board/create');
  }

  const countUpBoard = async (boardIdx) => {
    try {
      await axios.put(`${URL}/board/${boardIdx}/countup`);
      // 조회수 증가 요청 후 목록을 다시 가져올 수 있도록 갱신
      getBoardList();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBoardList();
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h5" gutterBottom style={{ marginBottom: '60px', marginTop: '60px', fontWeight: 'bold', color: '#7E5E48' }}>
          🎵 악기 연습에 관해 자유롭게 이야기 나눠보세요! 🎵
        </Typography>

        <StyledTable>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell style={{ width: '55%' }}>제목</StyledTableCell>
              <StyledTableCell style={{ width: '16%' }}>작성자</StyledTableCell>
              <StyledTableCell style={{ width: '16%' }}>날짜</StyledTableCell>
              <StyledTableCell style={{ width: '8%' }}>조회</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={row.boardIdx}>
                <StyledTableCell>
                  {/* <Link style={{ textDecoration: 'none' }} to={`/board/${row.boardIdx}`} onClick={() => countUpBoard(row.boardIdx)}> */}
                  <Link style={{ textDecoration: 'none' }} to={`/board/${row.boardIdx}`}>  
                    <BoldText>{row.boardTitle}</BoldText>
                  </Link>
                </StyledTableCell>
                <StyledTableCell style={{ color: '#999999' }}>{row.userNickname}</StyledTableCell>
                <StyledTableCell style={{ color: '#999999' }}>{row.boardDate}</StyledTableCell>
                <StyledTableCell style={{ color: '#999999' }}>{row.boardCount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
        <div style={{ marginTop: "50px", display: "flex", justifyContent: "center", width: "70%" }}>
          <StyledButton onClick={() => moveToCreate()}>글 작성하기</StyledButton>
        </div>
      </div>
    </>
  );
}
