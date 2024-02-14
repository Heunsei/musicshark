import axios from 'axios'
import { getCookie } from '../../util/cookie'
import { useNavigate } from 'react-router-dom';
import BoardDetail from './BoardDetail';


export const commentUpdateAction=async(board_id,comments,commentDetail)=>{
    console.log(commentDetail)
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    
    try{
        await axios({
            method : 'put' ,
            url:`${URL}/board/${board_id}/${comments}`,
            data :commentDetail,
            headers : {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => {
            alert('댓글이 수정되었습니다.');
            console.log(res)
        })
        .catch((err => {
            console.log(err)
        }))
    } catch(err) {
        console.log(err)
        return {
            error: true,
            err
        }
    }
}
