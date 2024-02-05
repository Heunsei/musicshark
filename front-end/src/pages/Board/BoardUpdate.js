import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

    const onChange=(event)=>{
        const {value,nickname}=event.target;
        setBoard({
            ...board,
            [nickname]:value,
        })
    }

    const getBoard = async () => {
        const resp = await (await axios.get(`//localhost:8080/board/${board_id}`)).data;
        setBoard(resp.data);
      };
    
      const updateBoard = async () => {
        await axios.patch(`//localhost:8080/board`, board).then((res) => {
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
        <div>
          <div>
            <span>제목</span>
            <input type="text" nickname="board_title" value={board_title} onChange={onChange} />
          </div>
          <br />
          <div>
            <span>작성자</span>
            <input type="text" nickname="board_nickname" value={board_nickname} readOnly={true} />
          </div>
          <br />
          <div>
            <span>내용</span>
            <textarea
              nickname="contents"
              cols="30"
              rows="10"
              value={board_contents}
              onChange={onChange}
            ></textarea>
          </div>
          <br />
          <div>
            <button onClick={updateBoard}>수정</button>
            <button onClick={backToDetail}>취소</button>
          </div>
        </div>
      );
    };

export default BoardUpdate;