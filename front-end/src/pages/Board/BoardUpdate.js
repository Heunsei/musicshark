import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { styled } from "@mui/material";

const BoardUpdate=()=>{
    const navigate=useNavigate();
    const {board_id}=useParams();
    const [board, setBoard]=useState({
        board_id:0,
        board_title:'',
        board_nickname:'',
        board_contents:'',
    })

    const{board_title,board_nickname,board_contents}=board;

    
const BoxWrapper = styled('div')({
  width: '200%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#FFEDD8',
  flexDirection: 'column',
})

    const onChange=(event)=>{
        const {value,nickname}=event.target;
        setBoard({
            ...board,
            [nickname]:value,
        })
    }

    const getBoard = async () => {
        const resp = await (await axios.get(`${process.env.REACT_APP_API_URL}/board/${board_id}`)).data;
        setBoard(resp.data);
      };
    
      const updateBoard = async () => {
        await axios.put(`${process.env.REACT_APP_API_URL}/board`, board).then((res) => {
          alert('수정되었습니다.');
          navigate('/board/' + board_id);
        });
      };
    
      const backToDetail = () => {
        navigate('/board/' + board_id);
      };
    
      useEffect(() => {
        getBoard();
      }, []);
    
      return (
        <>
        <BoxWrapper>
          <Navbar/>
        <div style={{textAlign:"center", minWidth:"90%"}}>
          <h2 >게시글 작성</h2>
          <hr/>
          <div>
            <span>제목</span>
            
            <input type="text" nickname="board_title" value={board_title} onChange={onChange} style={{width:"50%"}}/>
          </div>
          <hr/>
          <div>
            <label style={{verticalAlign:"top"}}>내용</label>
            <textarea
              nickname="contents"
              cols="30"
              rows="10"
              value={board_contents}
              onChange={onChange}
              style={{width:"50%"}}
            ></textarea>
          </div>
          <br />
          <div display="inline-block" position="absolute" style={{marginRright:0}}>
            <button onClick={updateBoard}>수정</button>
            <button onClick={backToDetail}>취소</button>
          </div>
        </div>
        </BoxWrapper>
        
        </>
      );
    };

export default BoardUpdate;