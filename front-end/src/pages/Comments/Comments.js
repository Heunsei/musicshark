import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Dialog, DialogContent, IconButton, TextField } from "@mui/material";
import { commentsCreateAction } from './commentsCreateAction';
import { getCookie } from "../../util/cookie";
import moment from "moment/moment";

const Comments=()=>{
    const {board_id} = useParams()
    const nickname = useSelector((state) => state.user.nickname)
    const URL = process.env.REACT_APP_API_URL
    const location=useLocation();
    const navigate=useNavigate();
    const [newComment, setNewComment] = useState('')
    const [commentList, setCommentList]=useState([]);

    const [content, setContent]=useState("");
    const token=useSelector(state=>state.login.login);
    const [isModify, setIsModify] = useState(false);
    const [selectedComment, setSelectedComment] = useState(undefined)

    const [show,setShow]=useState(false);

    const openModify = (idx) => {
        setIsModify(true)
        setSelectedComment(idx)
    }

    const handleModifyContent = (newComment,commentIdx) => {
        const accessToken = getCookie('accessToken')
        const getCommentModify= async () => {
            try{
                axios({
                    method :'put',
                    url : `${URL}/board/${board_id}/comments`,
                    data : {
                        comment_idx:commentIdx,
                        comment_content:newComment,
                        user_nickname:nickname,
                    },
                    headers : {
                        Authorization : `Bearer ${accessToken}`
                    }
                }).then((res) => {
                    const getCommentList= async () => {
                        try{
                            axios({
                                method :'get',
                                url : `${URL}/board/${board_id}/comments`,
                                headers : {
                                    Authorization : `Bearer ${accessToken}`
                                }
                            }).then((res) =>{
                                console.log(res.data)
                                setCommentList(res.data)
                            })
                        }
                        catch (err){
                            console.log(err)
                        }
                    }
                    getCommentList()
                })
            }
            catch (err){
                console.log(err)
            }
        }
        getCommentModify()
    }

    const closeModify = () => {
        setIsModify(false)
        setSelectedComment(undefined)
        setNewComment('')
    }

    const handleDeleteContent=(commentIdx) => {
        const accessToken = getCookie('accessToken')
        const deleteCommentList= async () => {
            try{
                axios({
                    method :'patch',
                    url : `${URL}/board/${board_id}/comments/${commentIdx}`,
                    headers : {
                        Authorization : `Bearer ${accessToken}`
                    }
                }).then((res) =>{
                    const getCommentList= async () => {
                        try{
                            axios({
                                method :'get',
                                url : `${URL}/board/${board_id}/comments`,
                                headers : {
                                    Authorization : `Bearer ${accessToken}`
                                }
                            }).then((res) =>{
                                console.log(res.data)
                                setCommentList(res.data)
                            })
                        }
                        catch (err){
                            console.log(err)
                        }
                    }
                    getCommentList()
                })
            }
            catch (err){
                console.log(err)
            }
        }
        deleteCommentList()
    }

    const handleGetContent = () => {
        const accessToken = getCookie('accessToken')
        const getCommentList= async () => {
            try{
                axios({
                    method :'get',
                    url : `${URL}/board/${board_id}/comments`,
                    headers : {
                        Authorization : `Bearer ${accessToken}`
                    }
                }).then((res) => console.log(res))
            }
            catch (err){
                console.log(err)
            }
        }
        getCommentList()
    }

    // 로드 시, commentList가 바뀔때마다 로드
    useEffect(() => {
        const accessToken = getCookie('accessToken')
        const getCommentList= async () => {
            try{
                axios({
                    method :'get',
                    url : `${URL}/board/${board_id}/comments`,
                    headers : {
                        Authorization : `Bearer ${accessToken}`
                    }
                }).then((res) =>{
                    console.log(res.data)
                    setCommentList(res.data)
                })
            }
            catch (err){
                console.log(err)
            }
        }
        getCommentList()
    },[])

    const handleContentSubmit = () => {
        const accessToken = getCookie('accessToken')
        const submitData = async () => {
            try{
                axios({
                    method :'post',
                    url : `${URL}/board/${board_id}/comments`,
                    data : {
                        comment_content:content,
                        user_nickname:nickname,
                    },
                    headers : {
                        Authorization : `Bearer ${accessToken}`
                    }
                }).then((res) => {
                    const getCommentList= async () => {
                        try{
                            axios({
                                method :'get',
                                url : `${URL}/board/${board_id}/comments`,
                                headers : {
                                    Authorization : `Bearer ${accessToken}`
                                }
                            }).then((res) =>{
                                console.log(res.data)
                                setCommentList(res.data)
                            })
                        }
                        catch (err){
                            console.log(err)
                        }
                    }
                    getCommentList()
                })

            }
            catch (err){
                console.log(err)
            }
        }
        submitData()
    }


    const goLogin=()=>{
        setShow(false);
        navigate(`login?redirectUrl=${location.pathname}`);
    }

    return(
        <div>

            <div style={{marginLeft : "15%", marginRight : "15%", fontSize : "16px"}} className="comments-body">
                {commentList.map((item, index)=>(
                    <div>

                    <div style={{display : "flex", justifyContent : "space-between"}} key={index} className="comments-comment">
                        
                        <div style={{fontSize : "18px"}} className="comment-content">{item.commentContent}</div>
                        <div style={{display:"flex"}}>
               <div style={{marginTop : "4px"}} >
                        <div className="comment-usename">{item.userNickname}</div>
                        <div style={{marginTop : "2px"}} className="comment-date">
                            {moment(item.commentDate).format('YYYY-MM-DD HH:mm:ss')}
                            </div>
                </div>
                <div style={{ marginLeft:"5px"}}>
                    <div style={{ marginBottom : "2px"}}>
                    <button style={{ fontSize:"12px", height:"25px",width:"40px"}} variant="outlined" onClick={() => openModify(index)}>
                        수정
                    </button>

                    </div>
                    <div>
                    <button style={{ fontSize:"12px",height:"25px",width:"40px"}} variant="outlined" onClick={() =>{ handleDeleteContent(item.commentIdx)}}>
                        삭제
                    </button>
                    </div>
                    </div>
                        </div>
                    </div>
                            {
                            isModify && index === selectedComment ? 
                            (   <>
                                <input value={newComment} onChange={(event) => setNewComment(event.target.value) }/>
                                <button onClick={() => handleModifyContent(newComment, item.commentIdx)} >제출</button>
                                <button onClick={() => closeModify(index)} >취소</button>
                                </>
                            )
                            : null
                        }
                            <hr style={{width : "100%"}}/>
                            </div>
                ))}
            </div>

            <div style={{
                display:'flex', 
                 marginLeft : "15%",
                 marginRight : "15%",
                 height : "100px"}}>
                  
                <TextField
                multiline
                rowsMax="1"
                sx={{ width:"100%",  borderRadius : "5px"}}
                onChange={(e)=>{
                    setContent(e.target.value)
                }}
                >
                </TextField>
                <div style={{border : "solid 1px ", borderRadius : "5px", width : "10%", height : "55%"}}>

                {content !== "" ? (
                    <Button sx={{width : "100%", height : "100%", fontWeight : 1000}} sty variant="outlined" onClick={() =>{ handleContentSubmit()}}>
                        등록하기
                    </Button>
                ):(
                    <Button sx={{width : "100%", height : "100%", fontWeight : 1000}} variant="outlined" disabled={true}>
                        등록하기
                    </Button>
                )}
                </div>
            </div>

            <Dialog open={show}>
                <DialogContent style={{position:"relative"}}>
                    <IconButton
                    style={{position:"absolute",top:"0",right:"0"}}
                    onClick={()=>{
                        setShow(false)
                    }}>
                        <DisabledByDefaultOutlinedIcon/>
                    </IconButton>
                     
                </DialogContent>
            </Dialog>
        </div>
  );
}
export default Comments;