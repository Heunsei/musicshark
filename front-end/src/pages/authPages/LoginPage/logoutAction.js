import { useNavigate } from 'react-router-dom'
import { removeCookie } from '../../../util/cookie';

/** local, session storage를 clear후, cookie를 지우고 유저를 로그인 페이지로 이동
 * @param function useNavitate
 * @param function useDispatch
 *  */
export const logoutAction = (navigate) => {
    localStorage.clear()
    removeCookie()
    navigate('/login')
}