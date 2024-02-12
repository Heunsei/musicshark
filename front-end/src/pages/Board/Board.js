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
const Board=({boardIdx, boardTitle, boardCount, userNickname,boardDate,boardContent})=>{
    const navigate=useNavigate();

    const moveToUpdate=()=>{
        navigate('/update/'+{boardIdx});
    }

    const deleteBoard=async()=>{
        if(window.confirm('게시글을 삭제하시겠습니까?')){
            await axios.delete(`//localhost:8080/board/${boardIdx}`)
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
                <h2>{boardTitle}</h2>
                <h5>{userNickname}</h5>
                <hr/>
                <p>{boardContent}</p>
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