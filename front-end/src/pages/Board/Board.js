import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

//import Comments from "./Comments";

/*
board_id, 
board_genre, 
board_title, 
board_name, 
board_views,
board_date
*/
const Board=({board_id, board_title, board_count, board_nickname,board_date,board_contents})=>{
    const navigate=useNavigate();

    const moveToUpdate=()=>{
        navigate('/update/'+board_id);
    }

    const deleteBoard=async()=>{
        if(window.confirm('게시글을 삭제하시겠습니까?')){
            await axios.delete(`//localhost:8080/board/${board_id}`)
            .then((res)=>{
                alert('삭제되었습니다.');
                navigate('/board');
            })
        }
    }

    const moveToList=()=>{
        navigate('/board');
    }

    return (
        <div>
            <div>
                <h2>{board_title}</h2>
                <h5>{board_nickname}</h5>
                <hr/>
                <p>{board_contents}</p>
            </div>
            <div>
                <button onClick={moveToUpdate}>수정</button>
                <button onClick={deleteBoard}>삭제</button>
                <button onClick={moveToList}>목록</button>
            </div>
        </div>
    )
}

export default Board;