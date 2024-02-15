import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, styled } from "@mui/material";
import Navbar from "../../components/Navbar";
import { getCookie } from "../../util/cookie";
import { useSelector } from "react-redux";
import { boardDeleteAction } from "./boardDeleteAction";
import 'moment/locale/ko';
import Comments from "../Comments/Comments";
 

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
     
        const response = await axios ({
            url : `${URL}/board/${board_id}`,
            headers : {
                Authorization : `Bearer ${accessToken}`
            },
            data : {board_idx  : board_id}

        })
        
        setData(response.data)
        setBoard(response.data);
        console.log(data);
        setLoading(false);
    };
   
    useEffect(()=>{
        getBoard();
    },[]);

    const moveToUpdate=()=>{
        navigate(`/update/${board_id}`);
    }

    const deleteBoard=async()=>{
        if(window.confirm('게시글을 삭제하시겠습니까?')){
            await axios.delete(`${process.env.REACT_APP_API_URL}/board/${boardIdx}`)
            .then((res)=>{
                alert('삭제되었습니다.');
                navigate('/board');
            })
        }
    }

    const moveToList=()=>{
        navigate('/board');
    }

    const [comments, setComment] = useState([]);
    
    const getComment = async()=>{
        const response = await axios ({
            url : `${URL}/board/${board_id}/${comments}`,
            headers : {
                Authorization : `Bearer ${accessToken}`
            },
            data : {board_idx  : board_id}

        })

        setData(response.data)
        setComment(response.data);
        setLoading(false);
        console.log(response.data);
    };

        const onInsert=(event)=>{
        console.log(event.target.value);
        const{value,name}=event.target;
        setComment({
            ...comments,
            [name]:value,
        })
    }
    
    if(board.boardDate === undefined){
         return;
       }
    else {
       var writeDate = board.boardDate.slice(0, 10);
       var writeTime = board.boardDate.slice(11, 19);
       var partHour = String(Number(writeTime.slice(0, 2))+9);
       var writeTimeOther = writeTime.slice(2, 8);
       writeTime = partHour + writeTimeOther;
    }

    return (
        <>
        <Navbar/>

        <div style={{textAlign:"center", Width:"100%"}}>
            <div>
                <h1 style={{marginLeft : "15%", marginTop : "2%",  textAlign : "left"}}>{data.boardTitle}</h1>
                <hr/>
                <div >
                    <table style={{ position:"relative", marginLeft:"auto", marginRight:"auto", width:"70%"}}>
                    <tr style={{display : "flex", justifyContent : "space-between"}}>
                    <td>작성자&nbsp;&nbsp; {"| "+nickname}</td>
                    <td>작성일&nbsp;&nbsp; {"| "+writeDate + " " + writeTime}</td>
                    <td>조회&nbsp;&nbsp; {board.boardCount}</td>
                    </tr>
                    
                </table>
                </div>
                <hr/>
                
                <div style={{textAlign : "left", marginLeft : "15%", marginTop : "2%",  height:300}}>
                    <p style={{fontSize : "18px"}}>{data.boardContent}</p>
                </div>
                
            </div>
            <div style={{textAlign: "right", marginRight : "15%"}}>
                <button style={{width : "50px", height : "35px", marginRight : "2px"}} onClick={moveToUpdate}>수정</button>
                <button style={{width : "50px", height : "35px", marginRight : "2px"}} onClick={()=>{
                    boardDeleteAction(board, board_id, nickname)
                    navigate('/board')
                }}>삭제</button>
                <button style={{width : "50px", height : "35px"}} onClick={moveToList}>목록</button>
            </div>
            <hr/>
            <div>
            
            <Comments/>
          <div style={{ marginBottom: "4rem" }}>
            {comments.map((comment) => {

              return (
                <Comments
                  key={comment.id}
                  id={comment.id}
                  name={comment.name}
                  content={comment.content}
                  
                />
                
              )
            })}
          </div>
        </div>
                <hr/>
        </div>
        </>
    )
}

export default BoardDetail;