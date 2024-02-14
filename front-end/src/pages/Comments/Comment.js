import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';

const Comment = ({ onInsert }) => {
    const [value, setValue] = useState({
        name: '',
        content: ''
    });

    const onChangeName = useCallback(
        (e) => {
            setValue({
                name: e.target.value,
                content: value.content,
            });
        },
        [value]
    );

    const onChangeContent = useCallback(
        (e) => {
            setValue({
                name: value.name,
                content: e.target.value,
            });
        },
        [value]
    );


    const onSubmit = useCallback(
        e => {
            onInsert(value.name, value.content);
            setValue({
                name: '',
                content: ''
            });

            e.preventDefault();
        },
        [onInsert, value],
    );

    return (
        <form className="CommentInsert" onSubmit={onSubmit}>
            <input classNames="inputNames"
                placeholder="이름"
                value={value.name}
                onChange={onChangeName}
            />
            <input placeholder="댓글"
                value={value.content}
                onChange={onChangeContent}
            />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    )
}

export default Comment;
// import axios from "axios";
// import React, { useCallback, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// //import moment from 'moment';
// import { useLocation, useNavigate } from "react-router-dom";
// import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { Button, Dialog, DialogContent, IconButton, TextField } from "@mui/material";
// // import { CommentsAction, commentsAction } from './CommentsAction';
// import { commentsCreateAction } from './commentsCreateAction';

// const Comment=({board_id})=>{
//     const [value,setValue]=useState({
//         name:'',
//         content:''
//     })

//     const onChangeName=useCallback(
//         (e)=>{
//             setValue({
//                 name:e.target.value,
//                 content:value.content,
//             });
//         },
//         [value]
//         );

//     const onChangeContent=useCallback(
//         (e)=>{
//             setValue({
//                 name:value.name,
//                 content:e.target.value,
//             });
//         },
//         [value]
//         );
    
//     // const URL = process.env.REACT_APP_API_URL
//     // const location=useLocation();
//     // const navigate=useNavigate();
//     // const [commentList, setCommentList]=useState([]);

//     // const [content, setContent]=useState("");
//     // const token=useSelector(state=>state.auth.token);

//     // const [page,setPage]=useState(1);
//     // const [pageCount,setPageCount]=useState(0);

//     // const [show,setShow]=useState(false);

//     // useEffect(()=>{
//     //     const getCommentList=async()=>{
//     //         const {data}=await axios.get(`${URL}/board/${board_id}&page_number=${page}&page_size=${5}`);
//     //         return data;
//     //     }
//     //     getCommentList().then((result)=>setCommentList([...commentList,...result]));
//     // },[page]);

//     // useEffect(()=>{
//     //     const getTotalBoard=async()=>{
//     //         const {data}=await axios.get(`/api/comment/count?board_id=${board_id}`);
//     //         return data.total;
//     //     }
//     //     getTotalBoard().then((result)=>setPageCount(Math.ceil(result/5)));
//     // },[]);

//     // const submit=useCallback(async()=>{
//     //     const comment={
//     //         board_id:board_id,
//     //         content:content,
//     //     }
//     //     alert("댓글 등록 완료");
//     //     window.location.reload();
//     // },[content]);

//     // console.log(commentList);

//     // const goLogin=()=>{
//     //     setShow(false);
//     //     navigate(`login?redirectUrl=${location.pathname}`);
//     // }

//     return(
//         <form className="CommentInsert" onSubmit={onSubmit}>
//             <input className="inputNames"
//             placeholder="이름"
//             value={value.name}
//             onChange={onChangeName}
//             />
//         <input placeholder="댓글"
//         value={value.content}

//         />
//         <button type="submit">

//         </button>
//         </form>
//     )
// }
// export default Comment;

// //             <div className="comments-header">
// //                 <TextField className="comments-header-textarea"
// //                 maxRows={3}
// //                 //onClick={isLogin}
// //                 onChange={(e)=>{
// //                     setContent(e.target.value)
// //                 }}
// //                 multiline placeholder="댓글을 입력해 주세요"
// //                 />
// //                 {content !== "" ? (
// //                     <Button variant="outlined" onClick={submit}>
// //                         등록하기
// //                     </Button>
// //                 ):(
// //                     <Button variant="outlined" disabled={true}>
// //                         등록하기
// //                     </Button>
// //                 )}
// //             </div>
// //             <div className="comments-body">
// //                 {commentList.map((item, index)=>(
// //                     <div key={index} className="comments-comment">
// //                         <div className="comment-username-date">
// //                             {/* <div className="comment-date">{
// //                             moment(item.created).add(9,"hour").format('YYYY-MM-DD HH:mm:ss')}
// //                             </div> */}
// //                         </div>
// //                         <div className="comment-content">{item.content}</div>
// //                         <div className="comment-usename">{item.user.username}</div>
// //                         <hr/>
// //                     </div>
// //                 ))}
// //             </div>
// //             {page<pageCount&&(
// //                 <div className="comments-footer"
// //                 onClick={()=>{
// //                     setPage(page+1);
// //                 }}
// //                 >댓글 더보기
// //                 <KeyboardArrowDownIcon/>
// //                 </div>
// //             )}

// //             <Dialog open={show}>
// //                 <DialogContent style={{position:"relative"}}>
// //                     <IconButton
// //                     style={{position:"absolute",top:"0",right:"0"}}
// //                     onClick={()=>{
// //                         setShow(false)
// //                     }}>
// //                         <DisabledByDefaultOutlinedIcon/>
// //                     </IconButton>
// //                     <div className="modal">
// //                         <div className="modal-title">로그인이 필요합니다</div>
// //                         <div className="modal-content">로그인 페이지로 이동하시겠습니까?</div>
// //                         <div className="modal-button">
// //                             <Button
// //                                 variant="outlined" color="error"
// //                                 onClick={goLogin}
// //                             >
// //                                 예
// //                             </Button>
// //                             <Button
// //                                 variant="outlined" color="primary"
// //                                 onClick={() => {
// //                                 setShow(false)
// //                                 }}
// //                             >
// //                                 아니오
// //                             </Button>
// //                         </div>
// //                     </div>
// //                 </DialogContent>
// //             </Dialog>
// //         </div>
// //   );
// // }
// // export default Comment;