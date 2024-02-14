import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { styled, Table,TableCell,tableCellClasses,TableHead,TableRow, TableBody } from "@mui/material";
import Navbar from './../../components/Navbar';
// import styles from "./Board.module.css";
import { Button } from "bootstrap";
import { getCookie } from "../../util/cookie";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    textAlign:'center',
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#997B66',
      color: theme.palette.common.white,
      fontSize:26,
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: '#EFD6BC',
      color: theme.palette.common.black,
      fontSize: 20,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({

    textAlign:'center',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));




    function createData(boardIdx, boardTitle, userIdx, boardCount,boardDate){
        return {boardIdx, boardTitle, userIdx, boardCount,boardDate};
    }

    const rows=[
        createData(1,'자유','가입','kim@ssafy.com',6,'2024-02-01'),
        createData(2,'자유','인사','kim@ssafy.com',6,'2024-02-01'),
    ];

export default function BoardList(){
    const [rows, setRow] = useState([])

    const authToken = getCookie('accessToken')
    const URL = process.env.REACT_APP_API_URL
    const naviate=useNavigate();
    const [boardList,setBoardList]=useState([]);

    const getBoardList=async()=>{
      try{
        const res = await axios({
          metehod : "get",
          url : `${URL}/board`,
          headers : {
            Authorization : `Bearer ${authToken}`
          }
        })
        console.log(res.data[0].boardTitle)
        await setRow(res.data)
      }
      catch (err) {
        console.log(err)
      }

        // const resp=(await axios.get('localhost:8080/board')).data
        // setBoardList(resp.data);

        // const pngn=resp.pagination;
        // console.log(pngn);
    }

    const moveToCreate=()=>{
        naviate('/board/create');
    }

    useEffect(()=>{
      getBoardList()
    },[])


    

    return(


<> 
<Navbar/>
            <Table>
                
                 <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>제목</StyledTableCell>
                        <StyledTableCell>작성자</StyledTableCell>
                        <StyledTableCell>조회</StyledTableCell>
                        <StyledTableCell>날짜</StyledTableCell>
                     </StyledTableRow>
                 </TableHead>
                 <TableBody>
                 {rows.map((row, i)=>(
                        <StyledTableRow key={row.boardIdx}>
                              <StyledTableCell>          
                                <Link style={{ textDecoration: 'none' }} to={`/board/${row.boardIdx}`}>{row.boardTitle}</Link>
                              </StyledTableCell>
                            <StyledTableCell>{row.userNickname}</StyledTableCell>
                            <StyledTableCell>{row.boardCount}</StyledTableCell>
                            <StyledTableCell>{row.boardDate}</StyledTableCell>
                         </StyledTableRow>
                     ))}
                 </TableBody>
            </Table>
            <div>
                 <button onClick={() => moveToCreate()}>글쓰기</button>
             </div>
</>
           
    );
}
