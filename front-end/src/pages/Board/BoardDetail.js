import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board from "./Board";
import axios from "axios";
import { styled } from "@mui/material";
import Navbar from "../../components/Navbar";
//import Comments from "./Comments";

const BoxWrapper = styled('div')({
    width: '200%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#997B66',
    flexDirection: 'column',
    border: "2px solid red",
})

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
        <>
        <Navbar/>
        <BoxWrapper>
            <div>
            
                <Board
                    board_id={board.board_id}
                    board_title={board.board_title}
                    board_contents={board.board_contents}
                    board_nickname={board.board_nickname}
                />
        </div>
        </BoxWrapper></>
        
        

    )
}

export default BoardDetail;