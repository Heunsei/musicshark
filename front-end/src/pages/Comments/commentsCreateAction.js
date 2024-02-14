import axios from 'axios'
import { getCookie } from '../../util/cookie'
import { useNavigate } from 'react-router-dom';


export const commentsCreateAction=async(comments_Detail,board_id)=>{
    console.log(comments_Detail)
    const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    
    try{
        await axios({
            method : 'post' ,
            url:`${URL}/board/${board_id}/comments`,
            data : comments_Detail,
            headers : {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => {
            alert('등록되었습니다.');
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
