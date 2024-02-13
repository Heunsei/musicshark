import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import styles from "./Board.module.css";
import axios from "axios";
import { Box, styled } from "@mui/material";
import Navbar from "../../components/Navbar";
import { getCookie } from "../../util/cookie";
import { useSelector } from "react-redux";
import { boardDeleteAction } from "./boardDeleteAction";
import Comments from "./Comments";
//import Comments from "./Comments";

// const BoxWrapper = styled('div')({
//     width: '200%',
//     height: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: '#997B66',
//     flexDirection: 'column',
//     border: "2px solid red",
// })

const BoardDetail=({boardIdx, boardTitle, boardCount, userNickname,boardDate,boardContent})=>{
    const nickname = useSelector((state) => state.user.nickname)
    const {board_id}=useParams();
    const [loading, setLoading]=useState(true);
    const [board, setBoard]=useState({});
    const accessToken = getCookie('accessToken')

    const navigate=useNavigate();
    const URL = process.env.REACT_APP_API_URL
    const [data, setData] = useState([])
    const getBoard=async()=>{
        // const resp=await(await axios.get(`//localhost:8080/board/${board_id}`)).data;
        const response = await axios ({
            url : `${URL}/board/${board_id}`,
            headers : {
                Authorization : `Bearer ${accessToken}`
            },
            data : {board_idx  : board_id}

        })
        // 보드 디테일 확인용 코드 >> 지금 제대로 받아오고는 있음
        // 이걸 데이터 받아와서 아래의 board에 넣어줘야함
        console.log('보드 디테일 확인',response.data)
        setData(response.data)
        setBoard(response.data);
        setLoading(false);
    };
    // const deleteBoard=async()=>{
    //     if(window.confirm('게시글을 삭제하시겠습니까?')){
    //         await axios.put(
    //             `${URL}/board/${board_id}/${nickname}`,{
    //             headers : {
    //             Authorization : `Bearer ${accessToken}`
    //             }
    //             })
    //         .then((res)=>{
    //             alert('삭제되었습니다.');
    //             navigate('/board');
    //         })
    //     }
    // }

    useEffect(()=>{
        getBoard();
    },[]);

    const moveToUpdate=()=>{
        navigate(`/update/${board_id}`);
    }



    const moveToList=()=>{
        navigate('/board');
    }

    return (
        <>
        <Navbar/>

        <div style={{textAlign:"center", Width:"100%"}}>
            <div>
                <h2 style={{margin:"2%"}}>{data.boardTitle}</h2>
                <hr/>
                <div>
                    <table style={{position:"relative", marginLeft:"auto", marginRight:"auto", width:"70%"}}>
                    <tr>
                    <td>작성자&nbsp;&nbsp; {nickname}</td>
                    <td>작성일&nbsp;&nbsp; {board.boardDate}</td>
                    <td>조회&nbsp;&nbsp; {board.boardCount}</td>
                    </tr>
                    
                </table>
                </div>
                <hr/>
                
                <div style={{height:300}}>
                    <p>{data.boardContent}</p>
                </div>
                
                
            </div>
            <div>
                <button onClick={moveToUpdate}>수정</button>
                <button onClick={()=>{
                    boardDeleteAction(board, board_id, nickname)
                }}>삭제</button>
                <button onClick={moveToList}>목록</button>
            </div>
            <hr/>
            <div><h5 style={{position:"absolute", right:"80%"}}>댓글</h5></div>
            
               
            
            {/* <div><Comments/></div> */}
            
                {/* <Board
                    board_id={data.board_id}
                    board_title={data.board_title}
                    board_contents={data.board_contents}
                    board_nickname={data.board_nickname}
                /> */}
                <hr/>
        </div>
        </>
        
        

    )
}

export default BoardDetail;