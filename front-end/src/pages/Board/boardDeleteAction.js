import axios from 'axios'
import { getCookie } from '../../util/cookie'
import { useSelector } from 'react-redux'
//import { useNavigate } from 'react-router-dom';


export const boardDeleteAction=async(boardDetail,board_id,nickname)=>{
    console.log(boardDetail)
  
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    if(window.confirm('게시글을 삭제하시겠습니까?')){
        await axios(`${URL}/board/${board_id}/${nickname}`,{
            method:'put',
            data : boardDetail,
            headers : {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => {
            console.log(res.data.data)
            boardDetail(res.data.data)
             alert('삭제되었습니다.');
            // console.log(res)
        })
        .catch((err => {
            console.log(err)
        }))
    }

}
