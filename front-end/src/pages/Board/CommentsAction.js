import axios from "axios"
import { setCookie } from "../../util/cookie"
import { setLogin } from "../../redux/store/loginSlice"

export const CommentsAction=async(contentDetails,dispatch,navigate)=>{
    console.log(JSON.stringify(contentDetails))
    try{
        const response = await axios({
            method:'post',
            url:'http://localhost:8080/board/{board_id/comments',
            data:contentDetails,
        })
        console.log(response)
        const ACCESS_TOKEN=response.data.accessToken
        const REFRESH_TOKEN=response.data.refreshToken

        if(ACCESS_TOKEN){
            setCookie('accessToken',ACCESS_TOKEN,{
                path:'/',
                secure:true,
                sameSite:'none',
            });
        }
        if(REFRESH_TOKEN){
            setCookie('refreshToken',REFRESH_TOKEN,{
                path:'/',
                secure:true,
                sameSite:'none',
            });
        }
if(ACCESS_TOKEN&&REFRESH_TOKEN){
    const isLogin=true;
    dispatch(setLogin(isLogin));
    axios({
        method:'get',
        url:'http://localhost:8080/board/{board_id}/comments',
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${ACCESS_TOKEN},`
        }
    })
    .then(res)=>{
        dispatch(setUser.setEmail(res.data.de))
    }
}

    }
}