import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BoardList=()=>{

    // const naviate=useNavigate();
    // const [boardList,setBoardList]=useState([]);

    // const getBoardList=async()=>{
    //     const resp=(await axios.get('localhost:8080/board')).data
    //     setBoardList(resp.data);

    //     const pngn=resp.pagination;
    //     console.log(pngn);
    // }

    // const moveToWrite=()=>{
    //     naviate('/write');
    // }

    // useEffect(()=>{
    //     getBoardList();
    // },[])


    function createData(board_id, board_genre, board_title, board_nickname, board_views,board_date){
        return {board_id, board_genre, board_title, board_nickname, board_views,board_date};
    }

    const rows=[
        createData(1,'자유','가입','kim@ssafy.com',6,'2024-02-01'),
        createData(2,'자유','인사','kim@ssafy.com',6,'2024-02-01'),
    ];

    return(
        <div>
             {/* <ul>
                {boardList.map((board)=>(
                    <li key={board.idx}>
                        <Link to={`/board/${board.idx}`}>{board.title}</Link>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={moveToWrite}>글쓰기</button>
            </div> */}

            <table>
                 <thead>
                     <th>아이디</th>
                     <th>분류</th>
                     <th>제목</th>
                     <th>작성자</th>
                     <th>조회</th>
                     <th>날짜</th>
                 </thead>
                 <tbody>
                 {rows.map((row)=>(
                         <tr key={row.board_id}>
                             <td component="th" scope="row">
                                 {row.board_id}
                             </td>
                             <td>{row.board_genre}</td>
                             <td>{row.board_title}</td>
                             <td>{row.communuty_nickname}</td>
                             <td>{row.board_views}</td>
                             <td>{row.board_date}</td>
                         </tr>
                     ))}
                 </tbody>
             </table>
        </div>
    )
}

export default BoardList;
