import axios from "axios"
import { setCookie } from "../../util/cookie"
import { setLogin } from "../../redux/store/loginSlice"
import * as setUser from "../../redux/store/userSlice";

export const BoardDetailAction=async(contentDetails,dispatch,navigate)=>{
    console.log(JSON.stringify(contentDetails))
    try{
        const response = await axios({
            method:'post',
            url:'http://localhost:8080/board/{board_id}/',
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
                url:'http://localhost:8080/board/{board_id}/',
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${ACCESS_TOKEN},`
                }
            })
            .then((res)=>{
                dispatch(setUser.setIdx(res.data.board_idx))
                navigate('/board')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }catch(err){
        console.log(err);
        return{
            error:true,
            err
        }
    }
}