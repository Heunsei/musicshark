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
    // const nickname = useSelector((state) => state.user.nickname)
    // console.log(nickname)
    const navigate=useNavigate();
    const [board,setBoard]=useState({
                boardTitle:'',
                boardContent:'',
                // userNickname:nickname
            })
const {boardTitle, boardContent}=board;
   
            
    


    const handleChange=(event)=>{
        console.log(event.target.value);
        const{value,name}=event.target;
        setBoard({
            ...board,
            [name]:value,
        })
    }

// function handleChange(event){
//     console.log(event.target.value);
//             const inputValue=event.target.value;
//             setBoardTitle(inputValue)
//             setBoardContent(inputValue)
                
            
//         }


    // const saveBoard=async()=>{
    //     await axios.post(`http://localhost:8080/board`)
    //     .then((res)=>{
    //         alert('등록되었습니다.');
    //         navigate('/board');
    //     })
    // }
           
            const backToList=()=>{
                navigate('/board');
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
                    }}>등록</button>
                       
                    </div>
                </div>
                </>
         )
        }
    
    export default BoardCreate;


//  const BoardCreate=()=>{
//     const navigate=useNavigate();

//     const [board,setBoard]=useState({
//         board_title:'',
//         board_nickname:'',
//         board_contents:'',
//     })

//     const {board_title, board_nickname, board_contents}=board;

//     const onChange=(event)=>{
//         const{value,nickname}=event.target;
//         setBoard({
//             ...board,
//             [nickname]:value,
//         })
//     }
    

//     const saveBoard=async()=>{
//         await axios.post(`//localhost:8080/board`,board)
//         .then((res)=>{
//             alert('등록되었습니다.');
//             navigate('/board');
//         })
//     }

//     const backToList=()=>{
//         navigate('/board');
//     }

//     return(
//         <div>
//             <div>
//                 <span>제목</span>
//                 <input 
//                 type="text" 
//                 nickname="board_title" 
//                 value={board_title} 
//                 onChange={onChange}/>
//             </div>
//             <br/>
//             <div>
//                 <span>작성자</span>
//                 <input
//                 type="text"
//                 nickname="board_nickname"
//                 value={board_nickname}
//                 onChange={onChange}/>
//             </div>
//             <br/>
//             <div>
//                 <span>내용</span>
//                 <textarea
//                 nickname="board_contents"
//                 cols="30"
//                 rows="10"
//                 value={board_contents}
//                 onChange={onChange}>
//                 </textarea>
//             </div>
//             <br/>
//             <div>
//                 <button onClick={saveBoard}>저장</button>
//                 <button onClick={backToList}>취소</button>
//             </div>
//         </div>
//     )
//  }

//  export default BoardCreate;