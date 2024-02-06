import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

 const BoardWrite=()=>{
    const navigate=useNavigate();

    const [board,setBoard]=useState({
        board_title:'',
        board_nickname:'',
        board_contents:'',
    })

    const {board_title, board_nickname, board_contents}=board;

    const onChange=(event)=>{
        const{value,nickname}=event.target;
        setBoard({
            ...board,
            [nickname]:value,
        })
    }

    const saveBoard=async()=>{
        await axios.post(`//localhost:8080/board`,board)
        .then((res)=>{
            alert('등록되었습니다.');
            navigate('/board');
        })
    }

    const backToList=()=>{
        navigate('/board');
    }

    return(
        <div>
            <div>
                <span>제목</span>
                <input 
                type="text" 
                nickname="board_title" 
                value={board_title} 
                onChange={onChange}/>
            </div>
            <br/>
            <div>
                <span>작성자</span>
                <input
                type="text"
                nickname="board_nickname"
                value={board_nickname}
                onChange={onChange}/>
            </div>
            <br/>
            <div>
                <span>내용</span>
                <textarea
                nickname="board_contents"
                cols="30"
                rows="10"
                value={board_contents}
                onChange={onChange}>
                </textarea>
            </div>
            <br/>
            <div>
                <button onClick={saveBoard}>저장</button>
                <button onClick={backToList}>취소</button>
            </div>
        </div>
    )
 }

 export default BoardWrite;