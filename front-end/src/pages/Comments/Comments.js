import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import moment from 'moment';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Dialog, DialogContent, IconButton, TextField } from "@mui/material";
// import { CommentsAction, commentsAction } from './CommentsAction';
import { commentsCreateAction } from './commentsCreateAction';
import { getCookie } from "../../util/cookie";

const Comments=()=>{
    const {board_id} = useParams()
    const nickname = useSelector((state) => state.user.nickname)
    const URL = process.env.REACT_APP_API_URL
    const location=useLocation();
    const navigate=useNavigate();
    const [commentList, setCommentList]=useState([]);

    const [content, setContent]=useState("");
    const token=useSelector(state=>state.login.login);


    const [show,setShow]=useState(false);

    // useEffect(()=>{
    //     const getCommentList=async()=>{
    //         const {data}=await axios.get(`${URL}/board/${board_id}/comments`);
    //         return data;
    //     }
    //     getCommentList().then((result)=>setCommentList([...commentList,...result]));
    // },[]);

    // useEffect(()=>{
    //     const getTotalBoard=async()=>{
    //         const {data}=await axios.get(`${URL}/board/${board_id}/comments`);
    //         return data.total;
    //     }
    //     getTotalBoard().then((result)=>setPageCount(Math.ceil(result/5)));
    // },[]);

    // useEffect(()=>{
    //     const submit=async()=>{
    //         const {data}=await axios.post(`${URL}/board/${board_id}/comments`);

    //         return data;
    //     }
    //     submit().then((result)=>setContent([...commentList]))
    // })

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
                }).then((res) => console.log(res))
            }
            catch (err){
                console.log(err)
            }
        }
        submitData()
    }

    // const submit=useCallback(async()=>{
    //     const comment={
    //         board_id:board_id,
    //         content:content,
    //         user_id:token,
    //     }
    //     alert("댓글 등록 완료");
    //     window.location.reload();
    // },[content]);

    console.log(commentList);

    const goLogin=()=>{
        setShow(false);
        navigate(`login?redirectUrl=${location.pathname}`);
    }

    return(
        <div>
            <div>
                <TextField
                maxRows={3}
                //onClick={isLogin}
                onChange={(e)=>{
                    setContent(e.target.value)
                }}
                multiline placeholder="댓글을 입력해 주세요"
                />
                {content !== "" ? (
                    <Button variant="outlined" onClick={() =>{ handleContentSubmit()}}>
                        등록하기
                    </Button>
                ):(
                    <Button variant="outlined" disabled={true}>
                        등록하기
                    </Button>
                )}
            </div>
            <div className="comments-body">
                {commentList.map((item, index)=>(
                    <div key={index} className="comments-comment">
                        <div className="comment-username-date">
                            {/* <div className="comment-date">{
                            moment(item.created).add(9,"hour").format('YYYY-MM-DD HH:mm:ss')}
                            </div> */}
                        </div>
                        <div className="comment-content">{item.commentContent}</div>
                        <div className="comment-usename">{item.userNickname}</div>
                        <hr/>
                    </div>
                ))}
            </div>
            {/* {page<pageCount&&(
                <div className="comments-footer"
                onClick={()=>{
                    setPage(page+1);
                }}
                >댓글 더보기
                <KeyboardArrowDownIcon/>
                </div>
            )} */}

            <Dialog open={show}>
                <DialogContent style={{position:"relative"}}>
                    <IconButton
                    style={{position:"absolute",top:"0",right:"0"}}
                    onClick={()=>{
                        setShow(false)
                    }}>
                        <DisabledByDefaultOutlinedIcon/>
                    </IconButton>
                    {/* <div className="modal">
                        <div className="modal-title">로그인이 필요합니다</div>
                        <div className="modal-content">로그인 페이지로 이동하시겠습니까?</div>
                        <div className="modal-button">
                            <Button
                                variant="outlined" color="error"
                                onClick={goLogin}
                            >
                                예
                            </Button>
                            <Button
                                variant="outlined" color="primary"
                                onClick={() => {
                                setShow(false)
                                }}
                            >
                                아니오
                            </Button>
                        </div>
                    </div> */}
                </DialogContent>
            </Dialog>
        </div>
  );
}
export default Comments;