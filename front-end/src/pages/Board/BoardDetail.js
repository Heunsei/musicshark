import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board from "./Board";
import axios from "axios";
import Comments from "./Comments";

const BoardDetail=()=>{
    const {board_id}=useParams();
    const [loading, setLoading]=useState(true);
    const [board, setBoard]=useState({});
    const getBoard=async()=>{
        const resp=await(await axios.get(`//localhost:8080/board/${board_id}`)).data;
        setBoard(resp.data);
        setLoading(false);
    };

    useEffect(()=>{
        getBoard();
    },[]);

    return (
        <div>
            {loading ? (
                <h2>loading...</h2>
            ):(
                <Board
                    board_id={board.board_id}
                    board_title={board.board_title}
                    board_contents={board.board_contents}
                    board_nickname={board.board_nickname}
                />
            )}
        </div>

    )
}

export default BoardDetail;