import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { styled, Table,TableCell,tableCellClasses,TableContainer,TableHead,TableRow,Paper, TableBody } from "@mui/material";
import Navbar from './../../components/Navbar';
import styles from "./BoardList.module.css";
import { Button } from "bootstrap";

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




    function createData(board_id, board_genre, board_title, board_nickname, board_views,board_date){
        return {board_id, board_genre, board_title, board_nickname, board_views,board_date};
    }

    const rows=[
        createData(1,'자유','가입','kim@ssafy.com',6,'2024-02-01'),
        createData(2,'자유','인사','kim@ssafy.com',6,'2024-02-01'),
    ];


export default function BoardList(){
    
//     // const naviate=useNavigate();
//     // const [boardList,setBoardList]=useState([]);

//     // const getBoardList=async()=>{
//     //     const resp=(await axios.get('localhost:8080/board')).data
//     //     setBoardList(resp.data);

//     //     const pngn=resp.pagination;
//     //     console.log(pngn);
//     // }

//     // const moveToWrite=()=>{
//     //     naviate('/write');
//     // }

//     // useEffect(()=>{
//     //     getBoardList();
//     // },[])


    

    return(

        // <TableContainer component={Paper}>
        //     <Table sx={{minWidth:700}} aria-label="customized table">
        //         <TableHead>
        //             <TableRow>
        //                 <StyledTableCell>아이디</StyledTableCell>
        //                 <StyledTableCell>분류</StyledTableCell>
        //                 <StyledTableCell>제목</StyledTableCell>
        //                 <StyledTableCell>작성자</StyledTableCell>
        //                 <StyledTableCell>조회</StyledTableCell>
        //                 <StyledTableCell>날짜</StyledTableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {rows.map((row)=>(
        //                 <StyledTableRow key={row.board_id}>
        //                     <StyledTableCell>{row.board_id}</StyledTableCell>
        //                     <StyledTableCell>{row.board_genre}</StyledTableCell>
        //                     <StyledTableCell>{row.board_title}</StyledTableCell>
        //                     <StyledTableCell>{row.board_nickname}</StyledTableCell>
        //                     <StyledTableCell>{row.board_views}</StyledTableCell>
        //                     <StyledTableCell>{row.board_date}</StyledTableCell>
        //                 </StyledTableRow>
        //             ))}
        //         </TableBody>
        //     </Table>
        // </TableContainer>
//              {/* <ul>
//                 {boardList.map((board)=>(
//                     <li key={board.idx}>
//                         <Link to={`/board/${board.idx}`}>{board.title}</Link>
//                     </li>
//                 ))}
//             </ul>
//             <div>
//                 <button onClick={moveToWrite}>글쓰기</button>
//             </div> */}


<> 
            <Table>
                
                 <TableHead>
                    <TableRow>
                        <StyledTableCell>번호</StyledTableCell>
                        <StyledTableCell>분류</StyledTableCell>
                        <StyledTableCell>제목</StyledTableCell>
                        <StyledTableCell>작성자</StyledTableCell>
                        <StyledTableCell>조회</StyledTableCell>
                        <StyledTableCell>날짜</StyledTableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                 {rows.map((row)=>(
                        <StyledTableRow key={row.board_id}>
                            <StyledTableCell>{row.board_id}</StyledTableCell>
                            <StyledTableCell>{row.board_genre}</StyledTableCell>
                            <StyledTableCell>{row.board_title}</StyledTableCell>
                            <StyledTableCell>{row.board_nickname}</StyledTableCell>
                            <StyledTableCell>{row.board_views}</StyledTableCell>
                            <StyledTableCell>{row.board_date}</StyledTableCell>
                         </StyledTableRow>
                     ))}
                 </TableBody>
            </Table>

</>
           
    );
}
