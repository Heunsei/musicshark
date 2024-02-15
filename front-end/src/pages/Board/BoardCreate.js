import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BoardDetail from './BoardDetail';
import Board from "./Board";
import { editGroupAction } from './../groupPages/GroupDetailPage/CenterInfoBox/editGroupAction';
import styles from './Board.module.css';
import { boardCreateAction } from './boardCreateAction';
import { useSelector } from 'react-redux';
import Navbar from "../../components/Navbar";

const BoardCreate=()=>{
     //const nickname = useSelector((state) => state.user.nickname)
     //console.log(nickname)
    const navigate=useNavigate();
    const [board,setBoard]=useState({
                boardTitle:'',
                boardContent:'',
                boardId:'',
                 //userNickname:nickname
            })
const {boardTitle, boardContent, boardId}=board;
   

    const handleChange=(event)=>{
        const{value,name}=event.target;
        setBoard({
            ...board,
            [name]:value,
        })
    }

            const backToList=()=>{
                navigate('/board');
            }

            const showBoard=()=>{
                navigate(`/board/${boardId}`);
            }
   

        return(
        <>
        <Navbar/>
            <div style={{textAlign: "center", width:"100%"}}>

                <h2 style={{margin:"4%"}}>게시글 작성</h2>
                <hr/>
                    <div>
                        <label>제목</label> &nbsp;&nbsp;&nbsp;
                        <input 
                        type="text" 
                        name="boardTitle"
                        value={boardTitle}
                        onChange={handleChange}
                        />
                        
                    </div>
                    <hr/>
                    <div>
                        <label style={{verticalAlign:"top"}}>내용</label> &nbsp;&nbsp;&nbsp;
                        <textarea placeholder="내용을 입력하세요"
                        name="boardContent"
                        cols="30"
                        rows="10"
                        value={boardContent}
                        onChange={handleChange}
                        />
                    </div>
                    <hr/>
                    <div>
                        <button onClick={backToList}>목록</button>
                        <button onClick={()=>{
                            boardCreateAction(board)
                            showBoard();
                    }}>등록</button>
                       
                    </div>
                </div>
                </>
         )
        }
    
    export default BoardCreate;

 