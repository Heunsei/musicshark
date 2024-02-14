import { useNavigate } from 'react-router-dom'
import { removeCookie } from '../../../util/cookie';
import * as setUser from './../../../redux/store/userSlice'
import { setLogin } from '../../../redux/store/loginSlice';

/** local, session storage를 clear후, cookie를 지우고 유저를 로그인 페이지로 이동
 * @param function useNavitate
 * @param function useDispatch
 *  */
export const logoutAction = (navigate, dispatch) => {
    localStorage.clear()
    dispatch(setLogin(false))
    dispatch(setUser.setEmail(''))
    dispatch(setUser.setNickname(''))
    dispatch(setUser.setGender(''))
    dispatch(setUser.setBrith(''))
    removeCookie()
    navigate('/login')
}