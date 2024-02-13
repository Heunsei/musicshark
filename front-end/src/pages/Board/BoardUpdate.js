import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { styled } from "@mui/material";
import { boardUpdateAction } from "./boardUpdateAction";
// import styles from "./Board.module.css";
import { useSelector } from "react-redux";
import { getCookie } from "../../util/cookie";

const BoardUpdate=()=>{

  
  const nickname = useSelector((state) => state.user.nickname)
  const {board_id}=useParams();
  const [loading, setLoading]=useState();
      const [data, setData] = useState([])
  const [board, setBoard]=useState({
      boardTitle:``,
              boardContent:``,
          })
          
const {boardTitle, boardContent}=board;
  const accessToken = getCookie('accessToken')

  const navigate=useNavigate();
  const URL = process.env.REACT_APP_API_URL


 
        const handleUpdataAction = () => {
          const data = {
            boardTitle : board.boardTitle,
            boardContent: board.boardContent
          }
          boardUpdateAction(board_id,data)
        }
  


  const handleChange=(event)=>{
      console.log(event.target.value);
      
      const{value,name}=event.target;
      setBoard({
          ...board,
          [name]:value,
      })
  }
    
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

    const getBoard=async(boardDetail)=>{
      // const resp=await(await axios.get(`//localhost:8080/board/${board_id}`)).data;
      const response = await axios ({
          url : `${URL}/board/${board_id}`,
          headers : {
              Authorization : `Bearer ${accessToken}`
          },
          data :board_id,boardDetail,
              })
      console.log('보드 업데이트 확인',response.data)
      setData(response.data)
      setBoard(response.data);
      setLoading(true);
    }
    // const getBoard = async () => {
    //     const resp = await (await axios.get(`${URL}/board/${board_id}`)).data;
    //     setBoard(resp.data);
    //   };
    
      // const updateBoard = async () => {
      //   await axios.patch(`${URL}/board`, board).then((res) => {
      //     alert('수정되었습니다.');
      //     navigate(`/board/${board_id}`);
      //   });
      // };
    
      const backToDetail = () => {
        navigate(`/board/${board_id}`);
      };
    
      useEffect(() => {
        getBoard();
      }, []);
    
      return (
        <>
          <Navbar/>
        <div style={{textAlign:"center", minWidth:"90%"}}>
          <h2 >게시글 수정</h2>
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
                        <button onClick={backToDetail}>취소</button>
                        <button onClick={()=>{
                          handleUpdataAction(board)
                            // boardUpdateAction(board, )
                    }}>수정</button>
                       
                    </div>
          {/* <div>
            <label>제목</label>&nbsp;&nbsp;&nbsp;
            
            <input type="text" nickname="board_title" value={boardTitle} onChange={onChange} style={{width:"50%"}}/>
          </div>
          <hr/>
          <div>
            <label style={{verticalAlign:"top"}}>내용</label>&nbsp;&nbsp;&nbsp;
            <textarea
              nickname="contents"
              cols="30"
              rows="10"
              value={boardContent}
              onChange={onChange}
              style={{width:"50%"}}
            ></textarea>
          </div>
          <br />
          <div display="inline-block" position="absolute" style={{marginRright:0}}>
            <button onClick={()=>{
                            boardUpdateAction(board)
                    }}>수정</button>
            <button onClick={backToDetail}>취소</button>
          </div> */}
        </div>
        
        </>
      );
    };

export default BoardUpdate;