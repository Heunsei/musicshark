import axios from 'axios'
import { getCookie } from '../../util/cookie'
//import { useNavigate } from 'react-router-dom';


export const boardDetailAction=async(board_id, setBoardDetail)=>{
    //console.log(boardDetail)
    //const URL = process.env.REACT_APP_API_URL
    const accessToken = getCookie('accessToken')
    
    try{
        await axios({
            method : 'get' ,
            url:`http://localhost:8080/board/${board_id}`,
            //data : boardDetail,
            headers : {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => {
            console.log(res.data.data)
            setBoardDetail(res.data.data)
            // alert('등록되었습니다.');
            // console.log(res)
        })
        .catch((err => {
            console.log(err)
        }))
    } catch(error) {
        console.log(error)
        return error.data
        {
            // error: true,
            // err
            
        }
    }
}
