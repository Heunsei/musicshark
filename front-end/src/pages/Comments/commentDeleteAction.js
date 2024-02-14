// import axios from 'axios'
// import { getCookie } from '../../util/cookie'
// import { useSelector } from 'react-redux'
// //import { useNavigate } from 'react-router-dom';


// export const commentDeleteAction=async(commentDetail,board_id,nickname)=>{
//     console.log(commentDetail)
  
//     const URL = process.env.REACT_APP_API_URL
//     const accessToken = getCookie('accessToken')
//     if(window.confirm('댓글을 삭제하시겠습니까?')){
//         await axios({
//             method:'put',
//             url:`${URL}/board/${board_id}/${nickname}`,
//             headers : {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         })
//         .then((res) => {
//             console.log(boardDetail)
//             boardDetail(res.data.data)
//              alert('삭제되었습니다.');
//             // console.log(res)
//         })
//         .catch((err => {
//             console.log(err)
//         }))
//     }

// }
