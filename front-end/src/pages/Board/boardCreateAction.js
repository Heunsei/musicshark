import axios from 'axios'
import { getCookie } from '../../util/cookie'
import { useNavigate } from 'react-router-dom';


export const boardCreateAction=async(boardDetail)=>{
    console.log(boardDetail)
    //const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    
    try{
        await axios({
            method : 'post' ,
            url:`${process.env.REACT_APP_API_URL}/board`, 
            data : boardDetail,
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
